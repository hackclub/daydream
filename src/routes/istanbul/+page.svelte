<script lang="ts">
	/**
	 * This is the template site! Create a copy of this folder (src/routes/example)
	 * and rename it to whatever you want your URL to be.
	 * 
	 * Then, configure the event name, location, and schedule below:
	 */

	// Configuration - Put your information here!
	const eventName = "İstanbul";
	const eventLocation = "İstanbul";
	const eventAddress = "Başak Mahallesi Şeyh Şamil Cad. No:14 Metrokent (Metro İstasyonu Yanı) Başakşehir/İstanbul"; // Leave this empty if you don't want an address
	// These two are optional
	const directionsURL = "https://maps.app.goo.gl/kihJ9AyKp3saE6og6"
	const contactLink = "mailto:daydream.istanbul.2025@gmail.com"
	
	// Sponsors Configuration
	const sponsorsEnabled = false; // Set to false to hide the entire sponsors section
	const sponsors = [
		{ image: "/example/logo1.png", name: "Sponsor 1", url: "https://example1.com" },
		{ image: "/example/logo2.png", name: "Sponsor 2", url: "https://example2.com" },
		{ image: "/example/logo3.png", name: "Sponsor 3", url: "https://example3.com" },
		{ image: "/example/logo4.png", name: "Sponsor 4", url: "https://example4.com" },
		{ image: "/example/logo5.png", name: "Sponsor 5", url: "https://example5.com" },
		{ image: "/example/logo6.png", name: "Sponsor 6", url: "https://example6.com" },
		{ image: "/example/logo7.png", name: "Sponsor 7", url: "https://example7.com" }
	];
	
	// Schedule Configuration - You don't need to use this exact schedule, this is just an example!
	const scheduleData: { title: string; items: { event: string; time: string; }[] }[] = [
		{
			title: "Cumartesi, 27 Eylül",
			items: [
				{ event: "Etkinlik Başlangıcı", time: "09:30" },
				{ event: "Kapanış", time: "21:40" }
			]
		},
	];

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	let currentUrl = '';
	let dreamIdeaText = '';
	let isGeneratingIdea = false;

	onMount(() => {
		if (browser) {
			currentUrl = window.location.href;
		}
	});

	$: pageTitle = `Daydream ${eventName} - ${eventLocation} Oyun Geliştirme Yarışması`;
	$: pageDescription = `Daydream ${eventName}'a ${eventLocation}'da katıl! Lise öğrencilerinin harika oyunlar yaptığı bir oyun geliştirme yarışması. Yemek, atölyeler ve ödüller dahil!`;
	$: pageKeywords = `oyun geliştirme yarışması, hackathon, genç kodlama, Hack Club, oyun geliştirme, ${eventLocation}, ${eventName}`;

	async function fetchIdea(): Promise<string> {
		let attempt = 0;
		const maxAttempts = 5;
		
		while (attempt < maxAttempts) {
			try {
				const response = await fetch('/api/idea', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					}
				});
				
				if (!response.ok) {
					if (response.status === 500) {
						throw new Error(`Server error: ${response.status}`);
					} else {
						// Don't retry on non-500 errors
						return "Gizemli yüzen bir dünyayı kurtarmak için büyülü kristaller topladığın bir oyun ne dersin?";
					}
				}
				
				const data = await response.json();
				return data.idea;
			} catch (error) {
				attempt++;
				console.warn(`Attempt ${attempt} failed:`, error);
				
				if (attempt >= maxAttempts) {
					return "Gizemli yüzen bir dünyayı kurtarmak için büyülü kristaller topladığın bir oyun ne dersin?";
				}
				
				// Wait before retrying
				await new Promise(resolve => setTimeout(resolve, 1000));
			}
		}
		
		return "Gizemli yüzen bir dünyayı kurtarmak için büyülü kristaller topladığın bir oyun ne dersin?";
	}

	async function dreamIdea() {
		if (isGeneratingIdea) return;
		
		isGeneratingIdea = true;
		dreamIdeaText = "Hayal ediyorum...";
		
		try {
			const idea = await fetchIdea();
			dreamIdeaText = idea;
		} catch (error) {
			dreamIdeaText = "Gizemli yüzen bir dünyayı kurtarmak için büyülü kristaller topladığın bir oyun ne dersin?";
		} finally {
			isGeneratingIdea = false;
		}
	}
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
	@font-face {
		font-family: 'Phantom Sans';
		src: url('/PhantomSans-Regular.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}

	/* Pixel font */
	@font-face {
		font-family: 'PixelOperator';
		src: url('/PixelOperator8.ttf') format('truetype');
		font-weight: normal;
		font-style: normal;
	}

	.font-pixel {
		font-family: 'PixelOperator', monospace;
		image-rendering: pixelated;
	}

	* {
		font-family: 'Phantom Sans', system-ui, -apple-system, sans-serif;
	}

	.text-pink {
		color: #E472AB;
	}

	.text-pink-dark {
		color: #C25794;
	}

	.bg-pink {
		background-color: #E472AB;
	}

	.border-b-pink-dark {
		border-bottom-color: #C25794;
	}

	.bg-gradient-radial {
		background: radial-gradient(
			ellipse at center,
			rgba(255, 255, 255, 0.2) 0%,
			rgba(255, 255, 255, 0.1) 30%,
			rgba(255, 255, 255, 0.05) 70%,
			transparent 100%
		);
	}

	.hover\:shadow-\[0_2px_0_0_theme\(colors\.pink\.dark\)\]:hover {
		box-shadow: 0 2px 0 0 #C25794;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-10px); }
	}

	@keyframes hover {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(var(--hover, -0.5rem)); }
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}

	.animate-hover {
		animation: hover 4s ease-in-out infinite;
	}

	.bg-size-\[100vw_100vh\] {
		background-size: 100vw 100vh;
	}

	/* Responsive text adjustments */
	@media (max-width: 768px) {
		.responsive-text {
			font-size: clamp(0.875rem, 2.5vw, 1.125rem);
		}
	}

	/* Override for window positioning on smaller screens */
	@media (max-width: 900px) {
		.faq-window {
			transform: rotate(0deg) !important;
		}
	}

	/* Paper styling for floating cards */
	.paper-card {
		filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.2));
	}

	/* Cloud animation */
	@keyframes drift {
		0% { transform: translateX(-100vw); }
		100% { transform: translateX(100vw); }
	}

	.clouds-drift {
		animation: drift 60s linear infinite;
	}

	/* Sticker hover effects */
	.sticker-hover:hover {
		transform: scale(1.05) rotate(5deg);
		transition: transform 0.2s ease;
	}

	/* Macintosh screen effect */
	.retro-screen {
		background: linear-gradient(
			45deg,
			rgba(255, 255, 255, 0.1) 0%,
			transparent 50%,
			rgba(0, 0, 0, 0.1) 100%
		);
	}
</style>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta name="keywords" content={pageKeywords} />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:image" content="https://daydream.hackclub.com/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="Daydream" />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={currentUrl} />
	<meta property="twitter:title" content={pageTitle} />
	<meta property="twitter:description" content={pageDescription} />
	<meta property="twitter:image" content="https://daydream.hackclub.com/og-image.png" />
	<meta property="twitter:creator" content="@hackclub" />
	<meta property="twitter:site" content="@hackclub" />
	
	<!-- Additional SEO -->
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Hack Club" />
	<link rel="canonical" href={currentUrl} />
	
	<!-- Analytics -->
	<script defer data-domain="daydream.hackclub.com" src="https://plausible.io/js/script.js"></script>
</svelte:head>

<!-- Background -->
<div class="fixed inset-0 bg-gradient-to-b from-[#C9E6F0] via-[#E8F4F8] to-[#F0F8FC] z-0"></div>

<!-- Floating clouds background -->
<div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
	<div class="absolute top-10 left-0 w-32 h-16 bg-[url('/cloud-1.png')] bg-contain bg-no-repeat animate-float opacity-60" style="animation-delay: 0s;"></div>
	<div class="absolute top-32 right-10 w-40 h-20 bg-[url('/cloud-2.png')] bg-contain bg-no-repeat animate-float opacity-50" style="animation-delay: 2s;"></div>
	<div class="absolute top-64 left-20 w-36 h-18 bg-[url('/cloud-3.png')] bg-contain bg-no-repeat animate-float opacity-70" style="animation-delay: 4s;"></div>
	<div class="absolute top-96 right-32 w-28 h-14 bg-[url('/cloud-1.png')] bg-contain bg-no-repeat animate-float opacity-40" style="animation-delay: 1s;"></div>
</div>

<!-- Main content -->
<div class="relative z-10 min-h-screen flex flex-col">
	<!-- Hero Section -->
	<div class="flex-1 flex flex-col items-center justify-center text-center px-8 pt-20 pb-16">
		<!-- Logo -->
		<img 
			src="daydream-logo.svg" 
			alt="Daydream Logo" 
			class="w-96 h-auto mb-8 max-sm:w-80 animate-float"
		/>
		
		<!-- Location and subtitle with underline -->
		<div class="relative inline-block px-4">
			<h3
				class="text-3xl italic font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent w-max max-sm:text-2xl mx-auto"
			>
				Lise öğrencileri için oyun geliştirme yarışması
			</h3>
			<img
				src="underline.svg"
				alt=""
				class="absolute left-1/2 -translate-x-1/2 -mt-1 h-auto scale-115"
			/>
			<h4
				class="text-2xl opacity-90 mt-2 font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent max-sm:text-xl"
			>
				 {@html eventLocation.replaceAll(" ", "&nbsp;")}daki gençler tarafından :)
			</h4>
		</div>

		<!-- CTA Buttons -->
		<div class="flex flex-col sm:flex-row gap-4 mt-12 max-sm:w-full max-sm:px-4">
			<a 
				href="https://example.com" 
				class="bg-[#E472AB] text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-[#D65BA0] transition-colors border-b-4 border-[#C25794] hover:border-[#B54A87] active:transform active:translate-y-1 active:border-b-2"
			>
				Kayıt Ol
			</a>
			{#if contactLink}
				<a 
					href={contactLink}
					class="bg-white text-[#487DAB] px-8 py-4 rounded-full text-xl font-semibold hover:bg-gray-50 transition-colors border-b-4 border-gray-300 hover:border-gray-400 active:transform active:translate-y-1 active:border-b-2"
				>
					İletişim
				</a>
			{/if}
		</div>
	</div>

	<!-- Letter Section -->
	<div class="relative min-h-screen flex items-center justify-center py-20">
		<!-- Background texture -->
		<div class="absolute inset-0 bg-[url('/letter-bg-texture.png')] opacity-20 bg-repeat"></div>
		
		<!-- Floating elements -->
		<div class="absolute top-20 left-10 w-16 h-16 animate-hover ![--hover:-0.3rem] ![animation-delay:0.5s]"></div>
			<img src="floating-sticker-1.png" alt="" class="w-full h-full object-contain sticker-hover" />
		</div>
		<div class="absolute top-40 right-20 w-20 h-20 animate-hover ![--hover:-0.2rem] ![animation-delay:2s]"></div>
			<img src="floating-sticker-2.png" alt="" class="w-full h-full object-contain sticker-hover" />
		</div>
		<div class="absolute bottom-20 left-20 w-18 h-18 animate-hover ![--hover:-0.4rem] ![animation-delay:3s]"></div>
			<img src="floating-sticker-3.png" alt="" class="w-full h-full object-contain sticker-hover" />
		</div>

		<div class="relative max-w-4xl mx-auto h-full flex items-start pt-24 max-sm:pt-40 px-8 max-sm:px-2">
		</div>
		<div class="relative z-20 px-20 pt-20 pb-52 rounded-lg mb-0 max-sm:px-18" style="background-image: url('/letter-top.png'), linear-gradient(to bottom, #FCEFC5 100px, transparent 100px), url('/letter-loop.png'); background-size: 100% auto, 100% auto, 100% auto; background-repeat: no-repeat, no-repeat, repeat-y; background-position: top, top, top; background-attachment: local, local, local;"></div>
			<div class="absolute bottom-0 left-0 w-full h-24 z-10 pointer-events-none bg-[url('/clouds-loop.png')] bg-repeat-x bg-bottom bg-contain"></div>
			<h2 class="text-5xl font-serif italic text-[#8B4513] mb-10 relative"></h2>
				Sevgili Hacker'lar, Müzisyenler ve Sanatçılar,
				<img src="/underline.svg" alt="" class="absolute left-0 -bottom-3 w-64 h-auto opacity-70">
			</h2>
			
			<div class="text-[#8B4513] font-serif text-xl leading-relaxed space-y-8"></div>
				<p>Hack Club'ın en yeni macerasına hoş geldiniz. Bu sonbahar sizleri Daydream'e katılmaya davet ediyoruz - 100 şehirde aynı anda gerçekleşen dünyanın en büyük Oyun Geliştirme Yarışması.</p>

				<p class="font-bold text-2xl">Hack Club bu sonbahar bir oyun yapmanı istiyor.</p>

				<p>Kendini oyun geliştiricisi olarak görmüyor musun? Sorun değil - ilk oyununu yapman için çevrimiçi ve yüz yüze tonlarca atölyemiz var!</p>

				<p>Bu sonbahar yeni bir şey öğrenmeye, gerçekten gurur duyacağın bir şey yapmaya, yeni arkadaşlar edinmeye ve birlikte inanılmaz bir macerayı paylaşmaya davet ediyoruz.</p>

				<p class="mb-2">Sevgilerle,</p>

				<p class="italic text-2xl opacity-85">Hack Club HQ'dan Augie ve Renran</p>
			</div>
		</div>
	</div>

	<!-- Schedule Section -->
	<div class="relative z-10">
		<div class="bg-[url('/clouds-loop.png')] bg-repeat-x w-full h-64 bg-bottom bg-contain relative"></div>
			<div class="w-full bg-[url('/billboard-bg-texture.png')] bg-contain bg-repeat py-6 relative" style="border-bottom: 8px solid #B4B4C5;">
				<h2 class="text-4xl font-serif text-[#F0F0FF] text-center">
					Program
				</h2>
				<!-- Brush texture overlay for header -->
				<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
			</div>

			<div class="bg-[url('/billboard-bg.png')] bg-cover bg-center px-8 py-12 relative">
				<!-- Brush texture overlay -->
				<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
				
				<div class="max-w-4xl mx-auto relative z-10">
					{#each scheduleData as day}
						<div class="mb-8 last:mb-0">
							<h3 class="text-3xl font-serif text-[#F0F0FF] mb-6 text-center">{day.title}</h3>
							<div class="grid gap-4 max-w-2xl mx-auto">
								{#each day.items as item}
									<div class="bg-white/90 rounded-lg p-4 flex justify-between items-center shadow-md">
										<span class="text-lg font-semibold text-[#335969]">{item.event}</span>
										<span class="text-lg font-mono text-[#487DAB] bg-[#E8F4F8] px-3 py-1 rounded">{item.time}</span>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Sponsors Section -->
	{#if sponsorsEnabled}
		<div class="relative z-10">
			<div class="w-full bg-[url('/billboard-bg-texture.png')] bg-contain bg-repeat py-6 relative" style="border-bottom: 8px solid #B4B4C5;">
				<h2 class="text-4xl font-serif text-[#F0F0FF] text-center">
					Sponsorlar
				</h2>
				<!-- Brush texture overlay for header -->
				<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
			</div>

			<div class="bg-[url('/billboard-bg.png')] bg-cover bg-center px-8 py-12 relative">
				<!-- Brush texture overlay -->
				<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
				
				<div class="max-w-6xl mx-auto relative z-10">
					<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
						{#each sponsors as sponsor}
							<a 
								href={sponsor.url} 
								target="_blank" 
								rel="noopener noreferrer"
								class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-[200px] aspect-square flex items-center justify-center"
							>
								<img 
									src={sponsor.image} 
									alt={sponsor.name}
									class="max-w-full max-h-full object-contain"
								/>
							</a>
						{/each}
					</div>

					{#if contactLink}
						<!-- Call to action for sponsors -->
						<div class="mt-8 text-center">
							<p class="text-lg text-[#335969]">Daydream {eventName}'a sponsor olmak ister misiniz? <a href={contactLink} class="underline hover:text-[#477783] transition-colors">İletişime geçin</a></p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<!-- Steps/Cards Section -->
	<div class="relative min-h-screen flex items-center justify-center py-20">
		<!-- Background clouds -->
		<div class="absolute inset-0 bg-[url('/clouds-loop.png')] bg-repeat-x bg-bottom bg-contain opacity-50"></div>
		
		<!-- Floating cards arranged in a scattered layout -->
		<div class="relative max-w-6xl mx-auto px-8">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-center justify-items-center">
				<!-- Card 1 -->
				<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:1.7s] z-20 paper-card" data-point="1">
					<img src="paper1.png" alt="" class="w-full h-full object-contain">
					<div class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
						<span class="font-sans text-[#E472AB] font-bold text-[1.3rem] mr-1">#1:</span> Daydream {eventName} için <a href="https://example.com" class="underline">kayıt ol</a>
					</div>
				</div>

				<!-- Card 2 -->
				<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:0.3s] z-20 paper-card" data-point="2">
					<img src="paper2.png" alt="" class="w-full h-full object-contain">
					<div class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
						<span class="font-sans text-[#639DEB] font-bold text-[1.3rem] mr-1">#2:</span> Bir atölyeye katıl ve oyun geliştirme hakkında öğren
					</div>
				</div>

				<!-- Card 3 -->
				<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:1.4s] z-20 paper-card" data-point="3">
					<img src="paper3.png" alt="" class="w-full h-full object-contain">
					<div class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
						<span class="font-sans text-[#AB68E2] font-bold text-[1.3rem] mr-1">#3:</span> Etkinlikte diğer gençlerle bir takım oluştur
					</div>
				</div>

				<!-- Card 4 -->
				<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:2.3s] z-20 paper-card" data-point="4">
					<img src="paper4.png" alt="" class="w-full h-full object-contain">
					<div class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
						<span class="font-sans text-[#F2993E] font-bold text-[1.3rem] mr-1">#4:</span> Oyununu yapmaya başla - <em>deneyim gerekli değil</em>
					</div>
				</div>
			</div>

			<!-- Final card centered below -->
			<div class="relative mt-16 flex justify-center">
				<div class="bg-[url('/card-final.png')] bg-contain bg-no-repeat bg-center text-2xl font-serif pt-24 px-8 w-128 h-96 text-center max-md:w-80 max-md:h-80 max-md:text-xl max-md:pt-16 animate-hover ![--hover:-0.15rem] ![animation-delay:1.9s] paper-card" data-point="5">
					<span class="font-sans text-[#F2CC32] font-bold text-[1.5rem] mr-1">#5:</span> Yaptığını dünyayla paylaş!
				</div>
			</div>
		</div>
	</div>

	<!-- Map/Location Section -->
	<div class="relative z-10 py-20">
		<div class="max-w-4xl mx-auto px-8 text-center">
			{#if eventAddress}
				<p class="text-center font-sans text-2xl pt-12 max-sm:text-xl text-[#60574b] z-10000">
					{#if directionsURL}
						Daydream {eventName} <a class="underline text-pink" href={directionsURL}>{eventAddress}</a> adresinde gerçekleşiyor!
					{:else}
						Daydream {eventName} <span class="underline">{eventAddress}</span> adresinde gerçekleşiyor!
					{/if}
				</p>
			{/if}
		</div>
	</div>

	<!-- Macintosh/Game Ideas Section -->
	<div class="relative min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-[#2D2D2D] to-[#1A1A1A]">
		<!-- CRT screen effect overlay -->
		<div class="absolute inset-0 retro-screen pointer-events-none"></div>
		
		<!-- Floating retro elements -->
		<div class="absolute top-20 left-10 w-16 h-16 animate-hover ![--hover:-0.2rem] ![animation-delay:1s]">
			<img src="floppy-disk.png" alt="" class="w-full h-full object-contain" />
		</div>
		<div class="absolute top-40 right-20 w-20 h-20 animate-hover ![--hover:-0.3rem] ![animation-delay:3s]">
			<img src="joystick.png" alt="" class="w-full h-full object-contain" />
		</div>

		<!-- Main content -->
		<div class="relative max-w-4xl mx-auto px-8 text-center text-white">
			<div class="space-y-8 max-sm:space-y-4 relative z-10">
				<h2 class="text-5xl md:text-6xl lg:text-7xl font-pixel leading-tight">
					Ne hayal <img src="/dream-pixel.png" alt="edeceksin?" class="h-[0.75em] font-serif italic [image-rendering:pixelated] inline align-middle -translate-y-1.5">
				</h2>
				
				<p class="text-xl md:text-2xl opacity-90 font-pixel">
					itch.io'da yayınlanabildiği sürece istediğin türde oyunu yapabilirsin! Yapılan tüm oyunlar yayınlanmalı ve diğer katılımcıların oynayabilmesi için çevrimiçi erişilebilir olmalı. Sadece itch.io gönderim linklerini kabul edeceğiz.
					<br>
					<br>
					Seni ilham almaya yönlendirmek için geçmiş hackathon'lardan bazı harika projeler:
				</p>
				
				<ul class="space-y-2 font-pixel text-xl md:text-2xl">
					<li class="flex items-start">
						<span class="mr-4">•</span>
						<a href="https://bucketfish.itch.io/remedy-renemy" target="_blank" class="underline mr-2">Remedy Renemy</a>Tongyu ve Kai Ling'den
					</li>
					<li class="flex items-start">
						<span class="mr-4">•</span>
						<a href="https://nanomars.itch.io/not-an-idle" target="_blank" class="underline mr-2">Not an Idle</a> Armand'dan
					</li>
					<li class="flex items-start">
						<span class="mr-4">•</span>
						<a href="https://juanes10201.itch.io/speedtickers" target="_blank" class="underline mr-2">SPEEDTICKERS</a> Agustin'den
					</li>
				</ul>
				
				<p class="text-xl md:text-2xl opacity-90 font-pixel leading-relaxed">
					Daydream'den önce Godot kullanarak oyun geliştirmeyi öğrenmen için atölyeler ve etkinlikler düzenleyeceğiz!
				</p>
				
				<!-- Bottom section with input -->
				<div class="flex flex-col md:flex-row md:items-end gap-10 pt-8">
					<div>
						<h3 class="text-3xl md:text-4xl font-pixel mb-4">Takıldın mı?</h3>
						<button 
							class="bg-[#D1E3EE] text-[#061E2D] px-8 py-4 font-pixel text-xl md:text-2xl hover:bg-[#B8D3E0] cursor-pointer max-sm:w-full"
							on:click={dreamIdea}
						>
							Benim için bir fikir hayal et
						</button>
					</div>

					<div class="flex-1 max-md:w-full">
						{#if dreamIdeaText}
							<div class="bg-[#061E2D] border-2 border-[#D1E3EE] p-6 font-pixel text-lg md:text-xl text-[#D1E3EE] max-sm:text-base">
								<p class="leading-relaxed">{dreamIdeaText}</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- FAQ Section -->
	<div class="relative min-h-screen flex flex-col items-center justify-center py-20 px-4">
		<!-- Background elements -->
		<div class="absolute inset-0 bg-gradient-to-b from-[#E8F4F8] to-[#C9E6F0] opacity-50"></div>
		
		<!-- FAQ Header -->
		<img src="faq.png" alt="SSS" class="mb-12 h-24 scale-175 max-md:scale-120">

		<!-- FAQ Grid -->
		<div class="grid grid-cols-2 gap-8 max-w-6xl px-8 z-10 max-[900px]:grid-cols-1 max-md:gap-16">
			<!-- FAQ Item 1 -->
			<div class="relative transform -rotate-2 faq-window">
				<img src="window-3.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
				<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
					<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">Daydream'e kimler katılabilir?</h3>
					<p class="text-sm responsive-text">Tüm lise ve üst ortaokul çağındaki öğrenciler gelebilir!</p>
				</div>
			</div>

			<!-- FAQ Item 2 -->
			<div class="relative transform rotate-1 faq-window">
				<img src="window-4.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
				<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
					<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">Kendi şehrimde Daydream organize edebilir miyim?</h3>
					<p class="text-sm responsive-text">Kesinlikle! daydream.istanbul.2025@gmail.com üzerinden bizimle iletişime geç veya slack'te #daydream kanalına katıl.</p>
				</div>
			</div>

			<!-- FAQ Item 3 -->
			<div class="relative transform rotate-2 faq-window">
				<img src="window-2.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
				<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24  opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
					<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">Tüm bunlar ücretsiz mi?</h3>
					<p class="text-sm responsive-text">Evet! Yemek, hediyeler ve güzel vakit geçirmek dahil. Ayrıca uzaktan geliyorsan benzin veya otobüs/tren bileti masrafını karşılıyoruz.</p>
				</div>
			</div>

			<!-- FAQ Item 4 -->
			<div class="relative transform -rotate-1 faq-window">
				<img src="window-1.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
				<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24  opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
					<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">Neye ihtiyacım var?</h3>
					<p class="text-sm responsive-text">Laptop'un, şarj aletlerin, kişisel eşyaların ve açık bir zihin!</p>
				</div>
			</div>

			<!-- FAQ Item 5 -->
			<div class="relative transform rotate-1 faq-window">
				<img src="window-4.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
				<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
					<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-1 max-md:text-base">Hack Club daha önce neler yaptı?</h3>
					<p class="text-sm responsive-text">Hack Club daha önce GitHub HQ'da hackathon, 50 şehirde Oyun Geliştirme Yarışması, Vermont'tan Los Angeles'a trendeki hackathon ve daha fazlasını düzenledi!</p>
				</div>
			</div>

			<!-- FAQ Item 6 -->
			<div class="relative transform rotate-1 faq-window">
				<img src="window-3.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
				<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
					<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">Kodlamada iyi değilim. Yine de katılabilir miyim?</h3>
					<p class="text-sm responsive-text">Bu oyun geliştirme yarışması tüm seviyeler için! Atölyeler ve diğer etkinlikler düzenleyeceğiz, gel ve birlikte öğrenelim.</p>
				</div>
			</div>

			<!-- FAQ Item 7 -->
			<div class="relative transform -rotate-2 faq-window">
				<img src="window-2.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
				<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
					<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">Ailem endişelenirse ne olacak?</h3>
					<p class="text-sm responsive-text">Yardım etmek için buradayız! Veli rehberini burada görebilirsin veya sorular için daydream.istanbul.2025@gmail.com adresinden bize ulaşabilirler.</p>
				</div>
			</div>

			<!-- FAQ Item 8 -->
			<div class="relative transform -rotate-1 faq-window">
				<img src="window-1.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
				<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
					<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">Daydream'de ne yapabilirim?</h3>
					<p class="text-sm responsive-text">Temaya dayalı HERHANGİ bir oyun türü! Platform, görsel roman, clicker oyunu, vs. Mümkün olduğunca yaratıcı ol!</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<footer class="relative z-10 bg-[#2D2D2D] text-white py-16">
		<div class="max-w-4xl mx-auto px-8 text-center">
			<img src="hack-club-flag.svg" alt="Hack Club" class="w-32 h-auto mx-auto mb-8 opacity-80" />
			
			<p class="text-xl mb-6 opacity-90">
				Daydream, dünya çapında gençlerin teknoloji ile yaratıcılığını destekleyen kar amacı gütmeyen kuruluş 
				<a href="https://hackclub.com" class="underline hover:text-pink transition-colors">Hack Club</a> 
				tarafından organize edilmektedir.
			</p>
			
			<div class="flex flex-col sm:flex-row gap-6 items-center justify-center text-lg">
				<a href="mailto:daydream.istanbul.2025@gmail.com" class="underline hover:text-pink transition-colors">
					daydream.istanbul.2025@gmail.com
				</a>
				<span class="hidden sm:block">•</span>
				<a href="https://hackclub.com/conduct" class="underline hover:text-pink transition-colors">
					Davranış Kuralları
				</a>
				<span class="hidden sm:block">•</span>
				<a href="https://hackclub.com/privacy" class="underline hover:text-pink transition-colors">
					Gizlilik Politikası
				</a>
			</div>
			
			<div class="mt-12 pt-8 border-t border-gray-600 opacity-70">
				<p>© 2024 Hack Club. Tüm hakları saklıdır.</p>
			</div>
		</div>
	</footer>
</div>

<!-- Floating sticker button -->
<a
	href="https://forms.hackclub.com/daydream-stickers"
	target="_blank"
	class="hidden md:block absolute bottom-16 left-16 z-50 w-max px-4 py-2 bg-pink border-b-2 border-b-pink-dark text-white rounded-full active:transform active:translate-y-0.5 transition-all duration-100 font-sans cursor-pointer overflow-visible hover:shadow-[0_2px_0_0_theme(colors.pink.dark)] hover:-translate-y-[2px] active:border-transparent active:shadow-none"
>
	Ücretsiz sticker al
	<div class="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
		<img src="sticker-icon.png" alt="" class="w-4 h-4" />
	</div>
</a></p></div></p></h2></div>
