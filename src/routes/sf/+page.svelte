<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import CloudImage from '$lib/components/CloudImage.svelte';
	import img1 from './prospectus/_images/img1.jpg';
	import img2 from './prospectus/_images/img2.jpg';
	import img4 from './prospectus/_images/img4.jpg';

	/** @type {import('./$types').PageData} */
	export let data;

	// Event Configuration
	const EVENT_NAME = 'Daydream San Francisco';
	const EVENT_LOCATION = 'San Francisco';
	const EVENT_VENUE = 'Cloudflare HQ';

	// Tier names and styles
	const tierStyles = {
		'sky-painter': { name: 'Sky-Painters', class: 'h-32' },
		stargazer: { name: 'Stargazers', class: 'h-28' },
		visionary: { name: 'Visionaries', class: 'h-24' },
		dreamer: { name: 'Dreamers', class: 'h-20' },
		'in-kind': { name: 'In-Kind Partners', class: 'h-16' }
	};
	const tierOrder = ['sky-painter', 'stargazer', 'visionary', 'dreamer', 'in-kind'];

	// Cities where the game jam is happening
	const cities = `Columbus
Lisbon 
Boston
Giza
Vancouver
Houston
New York City
Bengaluru
Tampa
Auckland
Omaha
Phoenix
Madrid
Boise
Ottawa
Hangzhou
Islamabad
London
Visakhapatnam
Dubai
San Francisco
Minneapolis
Seattle
Signapore
Sydney
Mumbai`.split('\n');

	let showVideoPopup = false;

	const tickerText = cities.join(' • ');

	let particles: Array<{
		id: number;
		x: number;
		y: number;
		opacity: number;
		rotation: number;
		velocityY: number;
		velocityX: number;
		scale: number;
	}> = [];
	let particleIdCounter = 0;
	let particleContainer: HTMLElement;
	let isTabVisible = true;
	const particleSpeedScale = 0.6;

	function openVideoPopup() {
		if (window.innerWidth <= 768) {
			window.open('https://www.youtube.com/watch?v=O44y8TeJrNE', '_blank');
		} else {
			showVideoPopup = true;
		}
	}

	function closeVideoPopup() {
		showVideoPopup = false;
	}

	function handleFormSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
		const email = emailInput.value;

		fetch('/api/submit-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		}).catch((error) => {
			console.warn('Failed to save email:', error);
		});

		const signupUrl = data.sf_data?.signup_form || '#';
		window.open(`${signupUrl}?email=${encodeURIComponent(email)}`, '_blank');

		emailInput.value = '';
	}

	function createParticle() {
		if (!particleContainer || !isTabVisible) return;

		const button = document.querySelector('a[href="https://forms.hackclub.com/daydream-stickers"]');
		if (!button) return;

		const buttonRect = button.getBoundingClientRect();
		const containerRect = particleContainer.getBoundingClientRect();

		const edgeInset = 16;
		const spawnWidth = buttonRect.width - edgeInset * 2;
		const spawnOffset = edgeInset;

		const particle = {
			id: particleIdCounter++,
			x: buttonRect.left - containerRect.left + spawnOffset + Math.random() * spawnWidth,
			y: buttonRect.top + buttonRect.height / 2 - containerRect.top,
			opacity: 1,
			rotation: Math.random() * 360,
			velocityY: (0.5 + Math.random() * 0.3) * particleSpeedScale,
			velocityX: 0,
			scale: 0.7 + Math.random() * 0.5
		};

		particles = [...particles, particle];
	}

	function updateParticles() {
		if (!isTabVisible) return;

		particles = particles
			.map((particle) => ({
				...particle,
				x: particle.x + particle.velocityX,
				y: particle.y + particle.velocityY,
				opacity: particle.opacity - 0.01,
				rotation: particle.rotation + 2,
				scale: particle.scale
			}))
			.filter((particle) => particle.opacity > 0);
	}

	function animateParticles() {
		updateParticles();
		requestAnimationFrame(animateParticles);
	}

	function handleVisibilityChange() {
		isTabVisible = !document.hidden;
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const cloudyBg = document.querySelector('.cloudy-bg-parallax');
		if (cloudyBg) {
			gsap.to(cloudyBg, {
				yPercent: 20,
				ease: 'none',
				scrollTrigger: {
					trigger: cloudyBg,
					start: 'bottom bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		}

		const heroUI = document.querySelector('.hero-ui-parallax');
		if (heroUI) {
			gsap.to(heroUI, {
				yPercent: 8,
				ease: 'none',
				scrollTrigger: {
					trigger: heroUI,
					start: 'bottom bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		}

		const backBuildings = document.querySelector('.buildings-back-parallax');
		if (backBuildings) {
			gsap.to(backBuildings, {
				yPercent: 20,
				ease: 'none',
				scrollTrigger: {
					trigger: backBuildings,
					start: 'bottom bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		}

		const frontBuildings = document.querySelector('.buildings-front-parallax');
		if (frontBuildings) {
			gsap.to(frontBuildings, {
				yPercent: 10,
				ease: 'none',
				scrollTrigger: {
					trigger: frontBuildings,
					start: 'top top',
					end: 'bottom top',
					scrub: true
				}
			});
		}

		document.addEventListener('visibilitychange', handleVisibilityChange);
		animateParticles();
		const particleInterval = setInterval(createParticle, 250);

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			clearInterval(particleInterval);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<svelte:head>
	<title>{EVENT_NAME}</title>
</svelte:head>

<div
	class="absolute top-0 left-0 w-full h-full bg-[url('/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
></div>

<div
	class="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-[#CCF4FD] to-[#B8D9F8] bg-blend-overlay relative"
>
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-30 pointer-events-none"
	></div>

	<div
		class="cloudy-bg-parallax absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[80vh] bg-[url(/cloudy-bg.png)] opacity-30 bg-cover bg-no-repeat bg-top pointer-events-none"
	></div>

	<div
		class="buildings-back-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-back.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"
	></div>

	<div
		class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none lg:-translate-y-35 -translate-y-20 overflow-hidden max-md:w-200 max-lg:w-[125%]"
	>
		<svg
			width="1280"
			height="464"
			viewBox="0 0 1280 464"
			class="w-full h-max pt-32 object-contain"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<path
					id="curvy-path"
					d="M-41 274.995C91.5 229.995 203.5 64.4946 483.5 39.9946C763.5 15.4946 892.5 151.495 1165 196.495C1383 232.495 1462.5 263.828 1475 274.995"
				/>
				<mask id="reveal-mask">
					<rect x="0" y="0" width="0" height="464" fill="white">
						<animate
							attributeName="width"
							values="0;1280"
							dur="2s"
							calcMode="spline"
							keySplines="0.05,0.7,0.3,1"
							keyTimes="0;1"
							begin="0.75s"
							fill="freeze"
						/>
					</rect>
				</mask>
			</defs>
			<g mask="url(#reveal-mask)">
				<path
					d="M-41 268.495C91.5 223.495 203.5 57.9946 483.5 33.4946C763.5 8.9946 892.5 144.995 1165 189.995C1383 225.995 1462.5 257.328 1475 268.495"
					stroke="#9EE4F2"
					stroke-width="28"
					fill="none"
					stroke-linecap="round"
				/>
				<text font-family="sans-serif" fill="#EDFCFF" font-weight="bold" font-size="18">
					<textPath href="#curvy-path" startOffset="-100%">
						{@html Array(2).fill(tickerText).join(' • ')} •
						<animate
							id="ticker-animation"
							attributeName="startOffset"
							values="-100%;0%"
							dur="30s"
							repeatCount="indefinite"
						/>
					</textPath>
				</text>
			</g>
		</svg>
	</div>

	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat pointer-events-none opacity-100 lg:-translate-y-15 bg-center mix-blend-overlay"
		style="mask-image: url('/buildings-back.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center top; -webkit-mask-image: url('/buildings-back.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center top;"
	></div>

	<div
		class="buildings-front-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-front.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"
	></div>
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat pointer-events-none opacity-100 lg:-translate-y-15 bg-center mix-blend-overlay"
		style="mask-image: url('/buildings-front.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center top; -webkit-mask-image: url('/buildings-front.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center top;"
	></div>
	<div
		class="hero-ui-parallax flex flex-col items-center justify-center text-center relative z-5 -translate-y-2"
	>
		<div class="inline-block relative">
			<div class="h-12"></div>
			<h2
				class="text-xl font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent absolute left-1/2 max-sm:translate-y-4 max-sm:mb-0 max-md:-mb-8 md:left-[calc(50%+4rem)] -translate-x-1/2 bottom-8 italic w-max md:text-lg max-sm:text-lg"
			>
				September 27th & 28th, 2025
			</h2>
			<img
				src="/daydream.png"
				alt="Daydream"
				class="h-40 mb-6 w-auto object-contain max-w-full px-4"
			/>
			<a
				href="https://hackclub.com"
				class="absolute top-0 -right-6 max-sm:right-0 max-sm:scale-80 animate-hover ![animation-delay:0.9s] ![--hover:-0.2rem]"
			>
				<img src="/flag-plane.png" alt="Hack Club" class="h-28" />
			</a>
		</div>
		<div class="relative inline-block px-4">
			<h3
				class="text-3xl italic font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent w-max max-sm:text-2xl mx-auto"
			>
				A game jam for high schoolers in {EVENT_LOCATION}
			</h3>
			<img
				src="/underline.svg"
				alt=""
				class="absolute left-1/2 -translate-x-1/2 -mt-1 h-auto scale-115"
			/>
			<h4
				class="text-2xl opacity-90 mt-2 font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent max-sm:text-xl"
			>
				Happening at {EVENT_VENUE}
			</h4>
		</div>

		<div class="mt-8 flex flex-col items-center gap-3 z-5 max-md:scale-90">
			<form
				on:submit={handleFormSubmit}
				class="rounded-full bg-white border-2 border-dark font-sans p-2 flex flex-row items-center gap-2 shadow-[0_3px_0_0_theme(colors.dark)] focus-within:border-pink focus-within:shadow-[0_3px_0_0_#E472AB] has-[button:active]:border-dark has-[button:active]:shadow-[0_3px_0_0_theme(colors.dark)] has-[button:focus]:border-dark has-[button:focus]:shadow-[0_3px_0_0_theme(colors.dark)]"
			>
				<input
					type="email"
					name="email"
					placeholder="Enter email to sign up"
					class="w-80 px-3 py-1 text-dark focus:outline-none"
					required
				/>
				<input type="hidden" name="mailingLists" value="cmd3c94kz0hvz0iwt7ps28cyd" />
				<button
					type="submit"
					class="bg-light h-full px-5 rounded-full border-b-2 border-[#B3866A] cursor-pointer hover:border-b-4 hover:transform active:border-b-0 active:transform active:translate-y-0.5 focus:outline-none transition-all duration-100"
				>
					<img src="/submit.svg" alt="Go" />
				</button>
			</form>
			<a
				href="https://forms.hackclub.com/daydream-stickers"
				target="_blank"
				class="w-max px-4 py-2 bg-pink border-b-2 border-b-pink-dark text-white rounded-full active:transform active:translate-y-0.5 transition-all duration-100 font-sans cursor-pointer mx-auto relative overflow-visible hover:shadow-[0_2px_0_0_theme(colors.pink.dark)] hover:-translate-y-[2px] active:border-transparent active:shadow-none active:"
			>
				Get free stickers
				<img
					src="/button-clouds.svg"
					alt=""
					class="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto object-contain pointer-events-none"
				/>
				<img
					src="/rock-sticker.png"
					alt=""
					class="absolute bottom-2 right-3 translate-2/3 w-18 h-18 object-contain pointer-events-none"
					style="transform: rotate(-15deg);"
				/>
			</a>
		</div>
	</div>

	<div bind:this={particleContainer} class="absolute inset-0 pointer-events-none z-0 opacity-70">
		{#each particles as particle (particle.id)}
			<img
				src="/particle.png"
				alt=""
				class="absolute w-3 h-3 pointer-events-none"
				style="left: {particle.x}px; top: {particle.y}px; opacity: {particle.opacity}; transform: rotate({particle.rotation}deg) scale({particle.scale});"
			/>
		{/each}
	</div>

	<img
		src="/clouds-top-middle-bg.svg"
		alt=""
		class="absolute left-5/12 -translate-x-1/2 w-7/12 -bottom-24"
	/>
	<div
		class="absolute left-5/12 -translate-x-1/2 w-7/12 -bottom-24 bg-[url('/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full"
		style="mask-image: url('/clouds-top-middle-bg.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/clouds-top-middle-bg.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"
	></div>

	<img
		src="/clouds-top-right-bg.svg"
		alt=""
		class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2"
	/>
	<div
		class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2 bg-[url('/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full"
		style="mask-image: url('/clouds-top-right-bg.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/clouds-top-right-bg.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"
	></div>

	<img
		src="/clouds-top-left-bg.svg"
		alt=""
		class="absolute left-0 w-3/12 -bottom-12 translate-y-1/2"
	/>
	<div
		class="absolute left-0 w-3/12 -bottom-12 translate-y-1/2 bg-[url('/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full"
		style="mask-image: url('/clouds-top-left-bg.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/clouds-top-left-bg.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"
	></div>

	<img
		src="/clouds-top-middle.png"
		alt=""
		class="absolute left-5/12 -translate-x-1/2 w-7/12 -bottom-24 z-20"
	/>
	<img
		src="/clouds-top-right.png"
		alt=""
		class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2 z-20"
	/>
	<img
		src="/clouds-top-left.png"
		alt=""
		class="absolute left-0 w-3/12 -bottom-12 translate-y-1/2 z-20"
	/>

	<div
		class="absolute bottom-8 right-8 max-sm:top-[calc(50%+22rem)] max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:bottom-auto max-sm:right-auto max-sm:scale-150 z-11000 [1750px]:scale-150 2xl:origin-bottom-right"
	>
		<div
			class="absolute -top-8 -left-4 text-base font-sans text-[#8B4513] transform -rotate-12 pointer-events-none z-10 max-sm:top-full max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:rotate-0 max-sm:mt-1 max-sm:text-center max-sm:text-xs animate-hover max-sm:![--hover:-0.2rem]"
		>
			click me!
		</div>

		<button
			on:click={openVideoPopup}
			class="w-40 h-24 rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group lg:w-72 lg:h-40 sm:w-40 sm:h-24 animate-hover max-sm:![--hover:-0.2rem]"
			style="box-shadow: 0 0 20px #905429"
		>
			<img
				src="/thumbnail.png"
				alt=""
				class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
			/>
			<div
				class="absolute inset-0 bg-[rgba(0,0,0,0.1)] bg-opacity-30 group-hover:bg-opacity-20 transition-colors duration-300 flex items-center justify-center"
			>
				<div
					class="scale-150 w-8 h-8 bg-[rgba(255,255,255,0.5)] bg-opacity-20 rounded-full flex items-center justify-center md:w-6 md:h-6 sm:w-4 sm:h-4"
				>
					<div
						class="w-0 h-0 border-l-[8px] border-l-[rgba(255,255,255,1)] border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-1 md:border-l-[6px] md:border-t-[4px] md:border-b-[4px] sm:border-l-[4px] sm:border-t-[3px] sm:border-b-[3px]"
					></div>
				</div>
			</div>
		</button>
	</div>
</div>

<div class="w-full relative flex items-start justify-center bg-[#FCEFC5]">
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-30 pointer-events-none -z-40"
	></div>

	<div
		class="relative max-w-4xl mx-auto h-full flex items-start pt-24 max-sm:pt-40 px-8 max-sm:px-2"
	>
		<div
			class="relative z-20 px-20 pt-20 pb-32 rounded-lg mb-0 max-sm:px-18"
			style="background-image: url('/letter-top.png'), linear-gradient(to bottom, #FCEFC5 100px, transparent 100px), url('/letter-loop.png'); background-size: 100% auto, 100% auto, 100% auto; background-repeat: no-repeat, no-repeat, repeat-y; background-position: top, top, top; background-attachment: local, local, local;"
		>
			<div
				class="absolute bottom-0 left-0 w-full h-24 z-10 pointer-events-none bg-[url('/clouds-loop.png')] bg-repeat-x bg-bottom bg-contain"
			></div>
			<h2 class="text-5xl font-serif italic text-[#8B4513] mb-10 relative">
				Welcome to {EVENT_NAME}!
				<img
					src="/underline.svg"
					alt=""
					class="absolute left-0 -bottom-3 w-full h-auto opacity-70"
				/>
			</h2>

			<div class="text-[#8B4513] font-serif text-xl leading-relaxed space-y-8">
				<p>
					This September 27th-28th, we are running <strong>{EVENT_NAME}</strong>, a 24-hour game jam
					where 200 of the Bay Area's brightest young minds will gather to create incredible video
					games from scratch.
				</p>
				<p>
					Daydream is a beginner-friendly event designed for high schoolers. It's a space where
					coders, artists, designers, and musicians collaborate in a whirlwind of creativity.
				</p>
				<p>
					We're so excited to be hosted at the stunning global headquarters of <strong
						>Cloudflare</strong
					>. Get ready to build your dream game in one of San Francisco's most innovative spaces!
				</p>
			</div>
		</div>
	</div>
</div>

<div
	class="w-full bg-[#FCEFC5] relative flex flex-col items-center justify-center pt-16 pb-24 px-4 space-y-24"
>
	<section class="max-w-4xl w-full mx-auto text-center text-[#8B4513] font-serif">
		<h2 class="text-5xl font-bold italic mb-12 relative">
			From an Experienced Team
			<img
				src="/underline.svg"
				alt=""
				class="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-auto opacity-70"
			/>
		</h2>
		<div class="text-xl leading-relaxed space-y-6">
			<p>
				Our organizing team has a proven track record of creating successful, large-scale events for
				high schoolers in the Bay Area. Our leadership previously organized
				<strong>Scrapyard SV</strong> and <strong>Counterspell SV</strong>, bringing together more
				than <strong>200 students</strong> for unforgettable hackathon experiences. We know how to create
				a safe, inspiring, and impactful event.
			</p>
		</div>
	</section>
	<div class="mt-12 flex flex-wrap justify-center items-center gap-8">
		<div class="w-full lg:w-2/5 transform -rotate-3">
			<CloudImage src={img4} alt="Students collaborating at a previous hackathon" />
		</div>
		<div class="w-full lg:w-2/5 transform rotate-2 scale-110 z-10">
			<CloudImage src={img2} alt="Students collaborating at a previous hackathon" />
		</div>
		<div class="w-full lg:w-2/5 transform -rotate-1">
			<CloudImage src={img1} alt="Group picture from previous hackathon" />
		</div>
	</div>

	{#if data.sf_data?.schedule}
		<section class="max-w-6xl w-full mx-auto text-[#8B4513] font-serif">
			<h2 class="text-5xl font-bold italic text-center mb-12 relative">
				Schedule
				<img
					src="/underline.svg"
					alt=""
					class="absolute left-1/2 -translate-x-1/2 -bottom-1 w-64 h-auto opacity-70"
				/>
			</h2>
			<div
				class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 bg-white/50 p-8 rounded-2xl shadow-lg border border-yellow-200"
			>
				<div>
					<h3 class="text-3xl font-bold text-center mb-6">
						{data.sf_data.schedule.saturday.title}
					</h3>
					<ul class="space-y-3 text-lg">
						{#each data.sf_data.schedule.saturday.items as item}
							<li class="flex justify-between border-b border-dashed border-yellow-800/20 pb-2">
								<span class="font-semibold">{item.event}</span>
								<span class="text-right pl-4">{item.time}</span>
							</li>
						{/each}
					</ul>
				</div>
				<div>
					<h3 class="text-3xl font-bold text-center mb-6">{data.sf_data.schedule.sunday.title}</h3>
					<ul class="space-y-3 text-lg">
						{#each data.sf_data.schedule.sunday.items as item}
							<li class="flex justify-between border-b border-dashed border-yellow-800/20 pb-2">
								<span class="font-semibold">{item.event}</span>
								<span class="text-right pl-4">{item.time}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</section>
	{/if}

	{#if data.sf_data?.sponsors && Object.keys(data.sf_data.sponsors).length > 0}
		<section class="max-w-6xl w-full mx-auto text-center text-[#8B4513] font-serif">
			<h2 class="text-5xl font-bold italic mb-12 relative">
				Our Sponsors
				<img
					src="/underline.svg"
					alt=""
					class="absolute left-1/2 -translate-x-1/2 -bottom-1 w-64 h-auto opacity-70"
				/>
			</h2>
			<div class="flex flex-col items-center space-y-12">
				{#each tierOrder as tierKey}
					{@const sponsorList = data.sf_data.sponsors[tierKey]}
					{#if sponsorList && sponsorList.length > 0}
						<div class="w-full">
							<h3 class="text-3xl font-bold mb-8">{tierStyles[tierKey]?.name || tierKey}</h3>
							<div class="flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
								{#each sponsorList as sponsor}
									<a
										href={sponsor.url}
										target="_blank"
										rel="noopener noreferrer"
										class="transition-transform hover:scale-105"
									>
										<img
											src={sponsor.image}
											alt="{sponsor.name} logo"
											class="object-contain {tierStyles[tierKey]?.class || 'h-20'}"
										/>
									</a>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</section>
	{/if}
</div>

<div
	class="w-full pb-24 pt-16 bg-gradient-to-b from-[#FCEFC5] to-[#e99cce] relative flex flex-col items-center justify-center"
>
	<img src="/faq-clouds.png" alt="" class="w-full" />
	<img src="/faq.png" alt="FAQ" class="mb-12 h-24 scale-175 max-md:scale-120" />

	<div class="grid grid-cols-2 gap-8 max-w-6xl px-8 z-10 max-[900px]:grid-cols-1 max-md:gap-16">
		<div class="relative transform -rotate-2">
			<img
				src="/window-3.png"
				alt="window"
				class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
			/>
			<div
				class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18"
			>
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">
					Who can participate in Daydream?
				</h3>
				<p class="text-sm">
					All high-school & upper-middle-school aged students are welcome to come!
				</p>
			</div>
		</div>
		<div class="relative transform rotate-1">
			<img
				src="/window-4.png"
				alt="window"
				class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
			/>
			<div
				class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18"
			>
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">
					Can I organize a Daydream in my city?
				</h3>
				<p class="text-sm">
					Definitely! Contact us via daydream@hackclub.com or join #daydream on slack.
				</p>
			</div>
		</div>
		<div class="relative transform rotate-2">
			<img
				src="/window-2.png"
				alt="window"
				class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
			/>
			<div
				class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18"
			>
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">
					All this, for free?
				</h3>
				<p class="text-sm">
					Yep! Food, swag and good vibes are all included. Plus, if you're joining us from afar,
					we'll cover the cost of gas or a bus / train ticket.
				</p>
			</div>
		</div>
		<div class="relative transform -rotate-1">
			<img
				src="/window-1.png"
				alt="window"
				class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
			/>
			<div
				class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18"
			>
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">
					What do I need?
				</h3>
				<p class="text-sm">Your laptop, chargers, toiletries, sleeping bags, and an open mind!</p>
			</div>
		</div>
		<div class="relative transform rotate-1">
			<img
				src="/window-4.png"
				alt="window"
				class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
			/>
			<div
				class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18"
			>
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-1 max-md:text-base">
					What has Hack Club done before?
				</h3>
				<p class="text-sm">
					Hack Club has run a hackathon in at GitHub HQ, a Game Jam in 50 cities, a hackathon on a
					train from Vermont to Los Angeles, and more!
				</p>
			</div>
		</div>
		<div class="relative transform rotate-1">
			<img
				src="/window-3.png"
				alt="window"
				class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
			/>
			<div
				class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18"
			>
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">
					I'm not good at coding. Can I still participate?
				</h3>
				<p class="text-sm">
					This game jam is for all skill levels! We'll have workshops and other events so join us
					and let's learn together.
				</p>
			</div>
		</div>
		<div class="relative transform -rotate-2">
			<img
				src="/window-2.png"
				alt="window"
				class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
			/>
			<div
				class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18"
			>
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">
					What if my parents are concerned?
				</h3>
				<p class="text-sm">
					We're here to help! You can see our parent guide here, or they can reach out to us at
					daydream@hackclub.com for questions.
				</p>
			</div>
		</div>
		<div class="relative transform -rotate-1">
			<img
				src="/window-1.png"
				alt="window"
				class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
			/>
			<div
				class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18"
			>
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">
					What can I make at Daydream?
				</h3>
				<p class="text-sm">
					ANY type of game based on the theme! Platformer, visual novel, clicker game, etc. Be as
					creative as possible!
				</p>
			</div>
		</div>
	</div>

	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
	></div>
</div>

<div class="w-full bg-[#FFFFF8] relative min-h-80">
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] bg-repeat opacity-10 pointer-events-none z-0"
	></div>
	<div
		class="opacity-60 absolute w-full h-32 bg-[url('brushstroking.png')] bg-repeat-x z-10 bg-size-[100vw_100vh] mix-blend-overlay"
		style="mask-image: url(/footer-clouds.png); mask-size: contain; mask-repeat: repeat-x; -webkit-mask-image: url(/footer-clouds.png); -webkit-mask-size: contain; -webkit-mask-repeat: repeat-x;"
	></div>
	<div
		class="w-full h-32 bg-[#e99cce] z-5"
		style="mask-image: url(/footer-clouds.png); mask-size: contain; mask-repeat: repeat-x; -webkit-mask-image: url(/footer-clouds.png); -webkit-mask-size: contain; -webkit-mask-repeat: repeat-x;"
	></div>

	<div
		class="absolute bottom-20 left-32 text-center z-20 max-md:bottom-12 max-md:left-8 max-md:right-4 max-md:text-left"
	>
		<p class="text-gray-700 mb-2">Made with ♡ by teenagers, for teenagers at Hack Club</p>
		<div class="flex space-x-4 max-md:flex-col max-md:space-x-0 max-md:space-y-2">
			<a
				href="https://hackclub.com"
				class="underline text-gray-700 hover:text-gray-900 transition-colors">Hack Club</a
			>
			<span class="text-gray-700 max-md:hidden">・</span>
			<a
				href="https://hackclub.com/slack"
				class="underline text-gray-700 hover:text-gray-900 transition-colors">Slack</a
			>
			<span class="text-gray-700 max-md:hidden">・</span>
			<a
				href="https://hackclub.com/clubs"
				class="underline text-gray-700 hover:text-gray-900 transition-colors">Clubs</a
			>
			<span class="text-gray-700 max-md:hidden">・</span>
			<a
				href="https://hackclub.com/hackathons"
				class="underline text-gray-700 hover:text-gray-900 transition-colors">Hackathons</a
			>
		</div>
	</div>

	<div
		class="max-sm:hidden absolute bottom-2 right-16 h-2/3 aspect-square bg-[url('brushstroking.png')] bg-repeat z-10 bg-size-[100vw_100vh] mix-blend-overlay"
		style="mask-image: url(/thought-bubbles.png); mask-size: contain; mask-repeat: no-repeat; -webkit-mask-image: url(/thought-bubbles.png); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat;"
	></div>
	<div
		class="max-sm:hidden absolute bottom-2 right-16 h-2/3 aspect-square bg-[#e99cce]"
		style="mask-image: url(/thought-bubbles.png); mask-size: contain; mask-repeat: no-repeat; -webkit-mask-image: url(/thought-bubbles.png); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat;"
	></div>
</div>

{#if showVideoPopup}
	<div
		class="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-70 flex items-center justify-center z-12000"
		on:click={closeVideoPopup}
		on:keydown={(e) => e.key === 'Escape' && closeVideoPopup()}
		role="dialog"
		aria-modal="true"
		aria-label="Video popup"
		tabindex="-1"
	>
		<button
			class="cursor-pointer absolute top-4 right-4 z-10 w-8 h-8 bg-[rgba(255,255,255,0.2)] hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors duration-200"
			on:click={closeVideoPopup}
			aria-label="Close video"
		>
			<span class="-translate-y-0.5">×</span>
		</button>
		<div
			class="relative w-[90vw] h-[90vh] max-w-6xl max-h-[80vh] bg-black rounded-lg overflow-hidden"
			on:click|stopPropagation
		>
			<iframe
				src="https://www.youtube.com/embed/hNYsNSY7Vz0?autoplay=1"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
				class="w-full h-full"
			></iframe>
		</div>
	</div>
{/if}

<style>
	:global(body) {
		background-color: #ccf4fd;
		max-width: 100vw;
		overflow-x: hidden;
	}
	:global(html) {
		overflow-x: hidden;
	}
</style>
