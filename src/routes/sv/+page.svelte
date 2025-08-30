<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	/** @type {import('./$types').PageData} */
	export let data;

	// Silicon Valley landmarks and tech companies

import discordSymbol from "./images/Discord-Symbol-Black.svg";
import instagramSymbol from "./images/Instagram_Glyph_Black.svg";

import vercelLogo from "./images/vercel-logotype-light.svg";
import frameworkLogo from "./images/Framework_Computer_logo.svg";

const cities = `Minecraft
Fortnite
Valorant
League of Legends
Overwatch
Apex Legends
Call of Duty
Grand Theft Auto V
The Legend of Zelda
Super Mario Odyssey
Elden Ring
Cyberpunk 2077
The Witcher 3
Stardew Valley
Among Us
Rocket League
Halo Infinite
Animal Crossing
Destiny 2
Roblox`.split('\n');

	// Generate ticker text from cities array with user's city inserted
	let tickerText = '';
	$: {
		const result: string[] = [];
		cities.forEach((city, index) => {
			result.push(city);
			// Insert user's city after every 12 cities
			if ((index + 1) % 12 === 0 && data.userCity) {
				result.push(
					`<a href="https://example.com"><tspan fill="#f49cc8" style="text-shadow: 0 0 8px #f7d4e6">${data.userCity}?</tspan></a>`
				);
			}
		});
		tickerText = result.join(' • ');
	}

	// Particle system
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
	const particleSpeedScale = 0.3;

	// Parallax variables
	let scrollY = 0;
	let innerHeight = 0;

	function createParticle() {
		if (!particleContainer || !isTabVisible) return;

		// Find the visible button - mobile first, then desktop
		const buttons = document.querySelectorAll(
			'a[href="https://forms.hackclub.com/daydream-stickers"]'
		);
		let button = null;

		for (const btn of buttons) {
			const styles = window.getComputedStyle(btn);
			if (styles.display !== 'none') {
				button = btn;
				break;
			}
		}

		if (!button) return;

		const buttonRect = button.getBoundingClientRect();
		const containerRect = particleContainer.getBoundingClientRect();

		// Spawn particles with 16px inset from edges (about half border radius)
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

	// Parallax effect calculation
	$: parallaxOffset = scrollY * 0.5;

	// Intersection Observer for scroll animations
	function setupScrollAnimations() {
		console.log('Setting up scroll animations...');

		// Add class to indicate JS is loaded
		document.documentElement.classList.add('js-loaded');
		console.log('Added js-loaded class to document');

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-in');
						console.log('Element animated in:', entry.target.className);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -20px 0px'
			}
		);

		// Immediate setup and fallback with multiple attempts
		const setupObserver = () => {
			const elements = document.querySelectorAll('.scroll-reveal');
			console.log('Found scroll-reveal elements:', elements.length);

			if (elements.length === 0) {
				console.warn('No scroll-reveal elements found, retrying...');
				return false;
			}

			elements.forEach((el, index) => {
				console.log(`Observing element ${index}:`, el.tagName, el.className);
				observer.observe(el);
			});

			return true;
		};

		// Try immediately
		if (!setupObserver()) {
			// Try again after DOM is ready
			setTimeout(() => {
				if (!setupObserver()) {
					// Final attempt after longer delay
					setTimeout(setupObserver, 500);
				}
			}, 100);
		}
	}

	onMount(() => {
		console.log('User city:', data.userCity);

		// Register GSAP plugins
		gsap.registerPlugin(ScrollTrigger);

		// Setup parallax for cloudy background
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

		// Setup parallax for hero UI elements
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

		// Setup parallax for back buildings (slower movement)
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

		// Setup parallax for front buildings (faster movement)
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

		// Update on resize
		const handleResize = () => {
			ScrollTrigger.refresh();
		};
		window.addEventListener('resize', handleResize);

		// Handle tab visibility changes
		document.addEventListener('visibilitychange', handleVisibilityChange);

		// Start particle animation
		animateParticles();

		// Start particle spawning
		const particleInterval = setInterval(createParticle, 250);

		// Setup scroll animations immediately
		setupScrollAnimations();

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			clearInterval(particleInterval);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<!-- <svelte:window bind:scrollY bind:innerHeight /> -->

<svelte:head>
	<title>Daydream Silicon Valley - Game Jam Paradise | September 27-28, 2025</title>
	<meta
		name="description"
		content="Join Silicon Valley's most innovative game jam! 48 hours of game creation magic with industry mentors, cutting-edge tools, and legendary rewards. Where game dev dreams become reality."
	/>
	<meta
		name="keywords"
		content="game jam, silicon valley, hackathon, game development, unity, programming, indie games, innovation, tech, california"
	/>
	<meta name="author" content="Hack Club" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- Accessibility -->
	<meta name="theme-color" content="#44DBC8" />
	<meta name="color-scheme" content="light" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://daydream.hackclub.com/" />
	<meta property="og:title" content="Daydream Silicon Valley - Game Jam Paradise" />
	<meta
		property="og:description"
		content="Join Silicon Valley's most innovative game jam! 48 hours of game creation magic with industry mentors and legendary rewards."
	/>
	<meta property="og:image" content="https://daydream.hackclub.com/banner.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://daydream.hackclub.com/" />
	<meta property="twitter:title" content="Daydream Silicon Valley - Game Jam Paradise" />
	<meta
		property="twitter:description"
		content="Join Silicon Valley's most innovative game jam! 48 hours of game creation magic with industry mentors and legendary rewards."
	/>
	<meta property="twitter:image" content="https://daydream.hackclub.com/banner.png" />

	<!-- Favicon -->
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

	<!-- Schema.org markup -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Event",
			"name": "Daydream Silicon Valley",
			"description": "Silicon Valley's most innovative game jam featuring 48 hours of game creation magic",
			"startDate": "2025-09-27T18:00:00-07:00",
			"endDate": "2025-09-28T18:00:00-07:00",
			"location": {
				"@type": "Place",
				"name": "Silicon Valley",
				"address": {
					"@type": "PostalAddress",
					"addressRegion": "CA",
					"addressCountry": "US"
				}
			},
			"organizer": {
				"@type": "Organization",
				"name": "Hack Club",
				"url": "https://hackclub.com"
			},
			"url": "https://daydream.hackclub.com"
		}
	</script>

	<script
		defer
		data-domain="daydream.hackclub.com"
		src="https://plausible.io/js/script.js"
	></script>
</svelte:head>

<div
	class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
></div>

<div
	class="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-[#F0F8FE] via-[#E8F4FD] to-[#D8EFFD] relative"
>
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-30 pointer-events-none"
	></div>

	<!-- Cloudy Background -->
	<div
		class="cloudy-bg-parallax absolute bottom-0 w-full h-[60vh] sm:h-[80vh] bg-[url(/cloudy-bg.png)] opacity-30 bg-cover bg-no-repeat bg-top pointer-events-none"
	></div>

	<div
		class="buildings-back-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-back.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"
	></div>

	<!-- Animated text ticker along curvy line -->
	<div
		class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none lg:-translate-y-35 -translate-y-20 overflow-hidden max-sm:w-[300%] max-md:w-[200%] max-lg:w-[125%] floating-slow"
	>
		<svg
			width="1280"
			height="464"
			viewBox="0 0 1280 464"
			class="w-full h-max pt-16 sm:pt-32 object-contain"
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
				<!-- Background path stroke -->
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

	<!-- brush texture clipped to back buildings -->
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat pointer-events-none opacity-100 lg:-translate-y-15 bg-center mix-blend-overlay"
		style="mask-image: url('/buildings-back.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center top; -webkit-mask-image: url('/buildings-back.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center top;"
	></div>

	<div
		class="buildings-front-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-front.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"
	></div>
	<!-- brush texture clipped to front buildings -->
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat pointer-events-none opacity-100 lg:-translate-y-15 bg-center mix-blend-overlay"
		style="mask-image: url('/buildings-front.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center top; -webkit-mask-image: url('/buildings-front.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center top;"
	></div>
	<div
		class="hero-ui-parallax flex flex-col items-center justify-center text-center relative z-5 -translate-y-2 floating-gentle px-4"
		style="transform: translateY({parallaxOffset * 0.1}px)"
	>
		<div class="inline-block relative animate-in-hero-container">
			<div class="h-6 sm:h-12"></div>
			<!-- space for the ship -->
			<h2
				class="text-base sm:text-lg md:text-xl font-serif bg-gradient-to-r from-[#487DAB] via-[#5A8DBD] to-[#44DBC8] bg-clip-text text-transparent absolute left-1/2 max-sm:translate-y-2 max-sm:mb-0 max-md:-mb-8 md:left-[calc(50%+4rem)] -translate-x-1/2 bottom-6 sm:bottom-8 italic w-max animate-in-date transition-all duration-300 hover:scale-105 hover:brightness-110"
			>
				September 27th & 28th, 2025
			</h2>
			<img
				src="daydream.png"
				alt="Daydream"
				class="h-24 sm:h-32 md:h-40 mb-13 sm:mb-6 w-auto object-contain max-w-full px-2 sm:px-4 animate-in-logo transition-all duration-500 hover:scale-110 hover:drop-shadow-2xl cursor-pointer"
			/>
			<a
				href="https://hackclub.com"
				class="absolute top-0 -right-3 sm:-right-6 max-sm:scale-60 sm:max-sm:scale-80 animate-hover ![animation-delay:0.9s] ![--hover:-0.2rem] animate-in-plane transition-all duration-300 hover:scale-110 hover:rotate-6 hover:brightness-110"
				aria-label="Visit Hack Club website"
			>
				<img src="flag-plane.png" alt="Hack Club logo with airplane" class="h-16 sm:h-20 md:h-28" />
			</a>
		</div>
		<div class="relative inline-block px-2 sm:px-4 animate-in-title">
			<h3
				class="text-2xl sm:text-3xl md:text-4xl italic font-serif bg-gradient-to-r from-[#487DAB] to-[#5A8DBD] bg-clip-text text-transparent w-max mx-auto transition-all duration-500 hover:scale-105 hover:tracking-wide cursor-default"
			>
				Silicon Valley's High School Game Jam
			</h3>
			<img
				src="underline.svg"
				alt=""
				class="absolute left-1/2 -translate-x-1/2 -mt-1 h-auto scale-90 sm:scale-100 md:scale-115 animate-in-underline transition-all duration-300 hover:scale-125"
			/>
			<h4
				class="text-lg sm:text-xl md:text-2xl opacity-90 mt-2 font-serif bg-gradient-to-r from-[#6B95C4] to-[#487DAB] bg-clip-text text-transparent animate-in-subtitle transition-all duration-300 hover:opacity-100 hover:scale-105 cursor-default"
			>
				Calling all coders, artists, musicians and gamers!
			</h4>
			<div class="text-sm sm:text-base md:text-lg font-semibold text-[#44DBC8] mt-2 opacity-90">
				$35,000+ Prize Pool • Industry Mentors • Cutting-Edge Tech
			</div>
		</div>

		<div class="mt-8 sm:mt-12 flex flex-col items-center gap-6 sm:gap-8 z-5 animate-in-cta">
			<!-- Primary CTA -->
			<a
			href="https://forms.hackclub.com/daydream-rsvp?event=recro0X4uHS1vxztZm"
			target="_blank"
			rel="noopener noreferrer"
			class="bg-gradient-to-r from-[#44DBC8] to-[#52E4D1] text-white text-base sm:text-lg md:text-xl font-bold py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-12 rounded-full hover:shadow-2xl hover:scale-110 transition-all duration-300 border-b-4 border-[#3CC2AF] active:border-b-0 active:translate-y-1 hover:from-[#487DAB] hover:to-[#5A8DBD] focus:outline-none focus:ring-4 focus:ring-[#44DBC8]/50 hover:brightness-110 hover:rotate-1 hover:-translate-y-1"
			aria-label="Register for Daydream Silicon Valley Game Jam (opens in new tab)"
			>
				Register Now
			</a>
			
			<div class="flex gap-8 items-center justify-center">
				<a
				href="https://discord.gg/jzkM8G6Qp9"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Join the Discord Server (opens in new tab)"
				>
					<img src={discordSymbol} alt="Discord" class="hover:scale-110 transition-all duration-300 active:border-b-0 active:translate-y-1 hover:brightness-110 hover:rotate-1 hover:-translate-y-1 w-11">
				</a>
				<a
				href="https://www.instagram.com/daydream_siliconvalley/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Follow us on Instagram (opens in new tab)"
				>
					<img src={instagramSymbol} alt="Instagram" class="hover:scale-110 transition-all duration-300 active:border-b-0 active:translate-y-1 hover:brightness-110 hover:rotate-1 hover:-translate-y-1 w-11">
				</a>
			</div>
		</div>
	</div>

	<!-- <img src="hot-air-balloon.png" alt="" class="absolute w-1/8 right-32 bottom-40 z-20"> -->
	<!-- <img src="hot-air-balloon.png" alt="" class="absolute w-1/12 left-36 bottom-81 z-20"> -->

	<!-- Particle container -->
	<div bind:this={particleContainer} class="absolute inset-0 pointer-events-none z-40 opacity-70">
		{#each particles as particle (particle.id)}
			<img
				src="cloud-{(particle.id % 4) + 1}.png"
				alt=""
				role="presentation"
				class="absolute w-3 h-3 pointer-events-none transition-all duration-100"
				style="left: {particle.x}px; top: {particle.y}px; opacity: {particle.opacity}; transform: rotate({particle.rotation}deg) scale({particle.scale});"
			/>
		{/each}
	</div>
</div>

<!-- Game Creation Experience Section -->
<div class="w-full bg-gradient-to-b from-[#FAFCFF] to-[#F5FBFF] py-16 sm:py-24 md:py-32 relative">
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-20 pointer-events-none"
		style="transform: translateY({parallaxOffset * 0.3}px)"
	></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="text-center mb-12 sm:mb-16 md:mb-20 scroll-reveal">
			<h2
				class="text-3xl sm:text-4xl md:text-5xl font-serif italic bg-gradient-to-r from-[#487DAB] via-[#5A8DBD] to-[#44DBC8] bg-clip-text text-transparent mb-6 md:mb-8"
			>
				Hackathon Magic: Make Games, Meet Cool People
			</h2>
			<p
				class="text-lg sm:text-xl md:text-2xl text-[#8B4513] font-serif max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-10 md:mb-12 px-4"
			>
				Whether you’re a beginner or experienced in programming- we’ll have workshops, resources and
				mentors throughout the 24 hours to help you with your project.
			</p>
		</div>

		<!-- Dreamy Features Grid -->
		<div class="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 sm:mb-16 md:mb-20">
			<!-- Industry Access -->
			<div
				class="relative transform rotate-1 scroll-reveal transition-all duration-200 hover:scale-102 cursor-pointer"
			>
				<div
					class="bg-gradient-to-br from-white via-[#FCFEFF] to-[#F8FDFF] rounded-2xl md:rounded-3xl border-2 border-[#E8F4FD] p-6 sm:p-8 md:p-10 shadow-lg transition-all duration-300 hover:border-[#44DBC8]/50 hover:bg-gradient-to-br hover:from-[#F8FDFF] hover:to-white"
				>
					<div class="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6">🎮</div>
					<h3
						class="text-xl sm:text-2xl font-serif font-bold text-[#487DAB] mb-3 md:mb-4 transition-all duration-300 hover:text-[#44DBC8]"
					>
						Proudly Hosting Hackathons Since 2014
					</h3>
					<p class="text-[#487DAB] text-base sm:text-lg leading-relaxed">
						Since HackClub's start in 2014, we have been hosting several beginner-friendly
						hackathons a year for high school coders and makers.
					</p>
				</div>
			</div>

			<!-- Dreamy Environment -->
			<div
				class="relative transform -rotate-1 scroll-reveal transition-all duration-200 hover:scale-102 cursor-pointer"
			>
				<div
					class="bg-gradient-to-br from-[#F8FDFF] via-white to-[#F0F8FE] rounded-2xl md:rounded-3xl border-2 border-[#E8F4FD] p-6 sm:p-8 md:p-10 shadow-lg transition-all duration-300 hover:border-[#44DBC8]/50 hover:bg-gradient-to-br hover:from-white hover:to-[#F8FDFF]"
				>
					<div class="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6">🍕</div>
					<h3
						class="text-xl sm:text-2xl font-serif font-bold text-[#487DAB] mb-3 md:mb-4 transition-all duration-300 hover:text-[#44DBC8]"
					>
						Valley Innovation Space
					</h3>
					<p class="text-[#487DAB] text-base sm:text-lg leading-relaxed">
						Daydream is a beginner friendly game jam for high schoolers happening in 100+ cities
						simultaneously where artists, musicians, and coders get together to build apps and
						games.
					</p>
				</div>
			</div>
		</div>

		<!-- Central Value Proposition -->
		<div class="relative transform rotate-0 scroll-reveal">
			<div
				class="bg-gradient-to-br from-[#E8F4FD] via-[#F0F8FE] to-[#CCF4FD] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 text-center shadow-lg border-2 border-[#CCF4FD]"
			>
				<h3
					class="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#487DAB] mb-4 md:mb-6"
				>
					Where Dreams Take Flight
				</h3>
				<div
					class="text-lg sm:text-xl md:text-2xl font-bold text-[#44DBC8] mb-3 md:mb-4 opacity-90"
				>
					$35,000+ Prize Pool
				</div>
				<p
					class="text-base sm:text-lg md:text-xl text-[#487DAB] opacity-90 max-w-4xl mx-auto leading-relaxed px-4"
				>
					In the same valley where mobile gaming was revolutionized and VR was reborn. Where
					billion-dollar game engines and platforms started as weekend hacks. Your breakthrough
					awaits, backed by Silicon Valley's most generous prize pool.
				</p>
			</div>
		</div>
	</div>
</div>

<!-- Silicon Valley Letter Section -->
<div
	class="w-full bg-gradient-to-b from-[#F8FFFE] via-[#FEFFFE] to-[#F0FFFE] py-16 sm:py-24 md:py-32 relative"
>
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-15 pointer-events-none"
		style="transform: translateY({parallaxOffset * 0.2}px)"
	></div>

	<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div
			class="bg-gradient-to-br from-white via-[#FCFEFF] to-[#F5FBFF] rounded-2xl md:rounded-3xl border-2 border-[#E8F4FD] p-6 sm:p-10 md:p-16 shadow-lg relative overflow-hidden scroll-reveal"
		>
			<div class="text-center mb-8 sm:mb-10 md:mb-12">
				<h2
					class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic bg-gradient-to-r from-[#487DAB] to-[#5A8DBD] bg-clip-text text-transparent mb-3 md:mb-4"
				>
					Dear Game Creator,
				</h2>
				<div class="w-24 sm:w-32 h-1 bg-[#44DBC8] mx-auto rounded-full"></div>
			</div>

			<div
				class="text-[#487DAB] font-serif text-base sm:text-lg md:text-xl leading-relaxed space-y-4 sm:space-y-5 md:space-y-6 max-w-4xl mx-auto"
			>
				<p class="text-lg sm:text-xl md:text-2xl font-bold text-[#44DBC8]">
					Game jams are pure magic. ✨
				</p>

				<p>
					You know that feeling: 2am, fueled by pizza and determination, when your character finally
					jumps the way you imagined. When strangers become teammates and wild game ideas somehow
					work. That magical moment when someone plays your prototype and actually has fun.
				</p>

				<p>
					Whether you’re a beginner or experienced in programming- we’ll have workshops, resources
					and mentors throughout the 24 hours to help you with your project.
				</p>

				<p>
					We'll make sure your idea comes to life and that you experience the pure hackathon magic
				</p>

				<p class="text-2xl font-bold text-center text-[#44DBC8]">
					This is where games become reality. 🎮
				</p>
			</div>

			<div class="text-center mt-8 sm:mt-10 md:mt-12">
				<a
					href="https://forms.hackclub.com/daydream-rsvp?event=recro0X4uHS1vxztZ"
					target="_blank"
					class="inline-block bg-gradient-to-r from-[#44DBC8] to-[#52E4D1] text-white text-base sm:text-lg md:text-xl font-bold py-3 sm:py-4 px-6 sm:px-8 md:px-12 rounded-full hover:shadow-2xl hover:scale-110 transition-all duration-300 border-b-4 border-[#3CC2AF] active:border-b-0 active:translate-y-1 hover:from-[#487DAB] hover:to-[#5A8DBD] hover:brightness-110 hover:rotate-1 hover:-translate-y-1"
				>
					Join the Silicon Valley Dream
				</a>
			</div>
		</div>
	</div>
</div>

<!-- Game Jam Opportunity Section -->
<div
	class="w-full bg-gradient-to-b from-[#F8FFFE] via-[#FCFFFE] to-[#F0FEFD] items-center justify-center px-4 sm:px-6 lg:px-8 relative py-16 sm:py-24 md:py-32"
>
	<div class="max-w-6xl mx-auto">
		<!-- Game Jam Invitation -->
		<div class="text-center mb-12 sm:mb-14 md:mb-16">
			<h2
				class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif italic bg-gradient-to-r from-[#487DAB] via-[#5A8DBD] to-[#44DBC8] bg-clip-text text-transparent font-bold mb-6 md:mb-8"
			>
				A Dreamy Opportunity
			</h2>
			<p
				class="text-lg sm:text-xl md:text-2xl text-[#8B4513] font-serif max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-10 md:mb-12 px-4"
			>
				Join talented young creators in Silicon Valley's High School Game Jam.
			</p>
		</div>
		<!-- Dreamy Stats -->
		<div class="grid md:grid-cols-3 gap-6 sm:gap-8">
			<div
				class="text-center transform rotate-1 scroll-reveal transition-all duration-200 hover:scale-105 cursor-pointer"
			>
				<div
					class="bg-gradient-to-br from-white via-[#FCFEFF] to-[#F8FDFF] rounded-2xl md:rounded-3xl border-2 border-[#E8F4FD] p-6 sm:p-8 shadow-lg transition-all duration-300 hover:border-[#44DBC8]/50"
				>
					<div class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#44DBC8] mb-2">48hrs</div>
					<p class="text-[#487DAB] text-sm sm:text-base">Of Silicon Valley innovation energy</p>
				</div>
			</div>
			<div
				class="text-center transform -rotate-1 scroll-reveal transition-all duration-200 hover:scale-105 cursor-pointer"
			>
				<div
					class="bg-gradient-to-br from-[#F8FDFF] via-white to-[#F0F8FE] rounded-2xl md:rounded-3xl border-2 border-[#E8F4FD] p-6 sm:p-8 shadow-lg transition-all duration-300 hover:border-[#44DBC8]/50"
				>
					<div class="text-2xl sm:text-3xl font-bold text-[#44DBC8] mb-2">$35K+</div>
					<p class="text-[#487DAB] text-sm sm:text-base">Prize pool awaiting dreamers</p>
				</div>
			</div>
			<div
				class="text-center transform rotate-2 scroll-reveal transition-all duration-200 hover:scale-105 cursor-pointer"
			>
				<div
					class="bg-gradient-to-br from-[#FCFEFF] via-white to-[#F5FBFF] rounded-2xl md:rounded-3xl border-2 border-[#E8F4FD] p-6 sm:p-8 shadow-lg transition-all duration-300 hover:border-[#44DBC8]/50"
				>
					<div class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#487DAB] mb-2">🏆</div>
					<p class="text-[#487DAB] text-sm sm:text-base">Silicon Valley-worthy rewards</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div
	class="w-full pb-16 sm:pb-20 md:pb-24 pt-8 sm:pt-12 md:pt-16 bg-gradient-to-b from-[#F8FFFE] via-[#FEFFFE] to-[#F5FDFE] relative flex flex-col items-center justify-center"
>
	<div class="text-center mb-12 sm:mb-16 md:mb-20 scroll-reveal px-4">
		<h2
			class="text-3xl sm:text-4xl md:text-5xl font-serif italic bg-gradient-to-r from-[#487DAB] to-[#5A8DBD] bg-clip-text text-transparent mb-4 md:mb-6"
		>
			Silicon Valley Game Jam Details
		</h2>
		<p class="text-lg sm:text-xl text-[#8B4513] font-serif">
			Everything you need to know about this epic Silicon Valley adventure
		</p>
	</div>

	<!-- Dreamy FAQ Grid -->
	<div class="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
		<!-- FAQ Item 1 -->
		<div
			class="bg-gradient-to-br from-white to-[#F8FDFF] rounded-2xl border-2 border-[#E8F4FD] p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-reveal"
		>
			<h3 class="text-lg sm:text-xl font-serif font-bold text-[#487DAB] mb-3">Who can join?</h3>
			<p class="text-[#487DAB] leading-relaxed text-sm sm:text-base">
				Creative high schoolers ready to turn their wildest game ideas into reality. Whether you're
				a coding wizard, pixel artist, sound designer, or just someone with amazing ideas!
			</p>
		</div>

		<!-- FAQ Item 2 -->
		<div
			class="bg-gradient-to-br from-[#F8FDFF] to-[#F0F8FE] rounded-2xl border-2 border-[#E8F4FD] p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-reveal"
		>
			<h3 class="text-lg sm:text-xl font-serif font-bold text-[#487DAB] mb-3">
				What's the venue like?
			</h3>
			<p class="text-[#487DAB] leading-relaxed text-sm sm:text-base">
				A stunning Silicon Valley workspace where innovation flows. Think Apple Park meets indie
				game studio - premium hardware, inspiring design, and that legendary Silicon Valley energy
				that breeds breakthrough ideas.
			</p>
		</div>

		<!-- FAQ Item 3 -->
		<div
			class="bg-gradient-to-br from-[#FCFEFF] to-[#F0FFFE] rounded-2xl border-2 border-[#E8F4FD] p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-reveal"
		>
			<h3 class="text-lg sm:text-xl font-serif font-bold text-[#487DAB] mb-3">What's included?</h3>
			<p class="text-[#487DAB] leading-relaxed text-sm sm:text-base">
				Everything magical: gourmet Silicon Valley meals, premium hardware, mentorship from
				Apple/Google engineers, exclusive swag, and 48 hours of pure innovation energy. Plus some
				dreamy surprises we're still crafting...
			</p>
		</div>

		<!-- FAQ Item 4 -->
		<div
			class="bg-gradient-to-br from-[#F5FBFF] via-[#F0F8FE] to-[#E8F4FD] rounded-2xl border-2 border-[#E8F4FD] p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-reveal"
		>
			<h3 class="text-lg sm:text-xl font-serif font-bold text-[#487DAB] mb-3">
				Who are the mentors?
			</h3>
			<p class="text-[#487DAB] leading-relaxed text-sm sm:text-base">
				Silicon Valley legends: Apple engineers who built gaming on iOS, Google developers behind
				mobile gaming frameworks, Meta VR pioneers, and indie developers who turned garage projects
				into hits. They're here to help your ideas come alive!
			</p>
		</div>

		<!-- FAQ Item 5 -->
		<div
			class="bg-gradient-to-br from-[#F8FDFF] via-[#F5FBFF] to-[#F0F8FE] rounded-2xl border-2 border-[#E8F4FD] p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-reveal"
		>
			<h3 class="text-lg sm:text-xl font-serif font-bold text-[#487DAB] mb-3">
				Why Silicon Valley?
			</h3>
			<p class="text-[#487DAB] leading-relaxed text-sm sm:text-base">
				Because this is where iPhone gaming was born, where VR was reimagined, where Unity was
				built, where the biggest gaming platforms started! Silicon Valley's innovation energy turns
				"what if" into billion-dollar realities.
			</p>
		</div>

		<!-- FAQ Item 6 -->
		<div
			class="bg-gradient-to-br from-[#f3f9fd] via-[#F0F8FE] to-[#e6f1fa] rounded-2xl border-2 border-[#E8F4FD] p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-reveal"
		>
			<h3 class="text-lg sm:text-xl font-serif font-bold text-[#487DAB] mb-3">
				Any special rewards?
			</h3>
			<p class="text-[#487DAB] leading-relaxed text-sm sm:text-base">
				Something magical is being crafted for the most innovative creators... Silicon Valley's
				finest companies are quietly assembling something special. The details float in like morning
				mist, soon to be revealed. ✨
			</p>
		</div>

		<!-- FAQ Item 7 -->
		<div
			class="bg-gradient-to-br from-[#F5FBFF] via-[#F0F8FE] to-[#E8F4FD] rounded-2xl border-2 border-[#E8F4FD] p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-reveal"
		>
			<h3 class="text-lg sm:text-xl font-serif font-bold text-[#487DAB] mb-3">
				I'm new to game dev. Can I still join?
			</h3>
			<p class="text-[#487DAB] leading-relaxed text-sm sm:text-base">
				Absolutely! Game jams are perfect for beginners. You'll learn by doing, get help from
				mentors, and discover that making games is way more fun than you imagined.
			</p>
		</div>

		<!-- FAQ Item 8 -->
		<div
			class="bg-gradient-to-br from-[#E8F4FD] via-[#F0F8FE] to-[#F8FDFF] rounded-2xl border-2 border-[#E8F4FD] p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-reveal"
		>
			<h3 class="text-lg sm:text-xl font-serif font-bold text-[#487DAB] mb-3">
				What should I bring?
			</h3>
			<p class="text-[#487DAB] leading-relaxed text-sm sm:text-base">
				Just your laptop, creativity, and willingness to dream big! We'll provide everything else -
				from premium hardware and software to unlimited snacks and the most inspiring workspace in
				Silicon Valley.
			</p>
		</div>
	</div>

	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-20 pointer-events-none"
		style="transform: translateY({parallaxOffset * 0.1}px)"
	></div>
</div>

<!-- Dreamy Rewards Section -->
<div
	class="w-full bg-gradient-to-b from-[#F8FFFE] via-[#E8F8FD] to-[#D8F4FC] py-16 sm:py-20 md:py-24 relative"
>
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-10 pointer-events-none"
		style="transform: translateY({parallaxOffset * 0.15}px)"
	></div>

	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
		<div class="mb-12 sm:mb-14 md:mb-16 scroll-reveal">
			<h2
				class="text-3xl sm:text-4xl md:text-5xl font-serif italic bg-gradient-to-r from-[#487DAB] to-[#5A8DBD] bg-clip-text text-transparent mb-4 md:mb-6"
			>
				$35,000+ Prize Pool ✨
			</h2>
			<p
				class="text-base sm:text-lg text-[#487DAB]/80 font-serif max-w-2xl mx-auto leading-relaxed px-4"
			>
				Silicon Valley's most generous game jam rewards await the most innovative creators. Your
				breakthrough game could earn you legendary prizes worthy of the valley...
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
			<div
				class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-[#E8F4FD] hover:bg-white/80 transition-all duration-300 transform hover:scale-105 floating-slow scroll-reveal"
			>
				<div class="text-2xl sm:text-3xl mb-2 sm:mb-3">✨</div>
				<div class="text-[#487DAB] font-serif text-xs sm:text-sm opacity-80">
					Grand creation awaits
				</div>
			</div>
			<div
				class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-[#E8F4FD] hover:bg-white/80 transition-all duration-300 transform hover:scale-105 floating-gentle scroll-reveal"
			>
				<div class="text-2xl sm:text-3xl mb-2 sm:mb-3">🌟</div>
				<div class="text-[#487DAB] font-serif text-xs sm:text-sm opacity-80">
					Innovation excellence
				</div>
			</div>
			<div
				class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-[#E8F4FD] hover:bg-white/80 transition-all duration-300 transform hover:scale-105 floating-medium scroll-reveal"
			>
				<div class="text-2xl sm:text-3xl mb-2 sm:mb-3">💎</div>
				<div class="text-[#487DAB] font-serif text-xs sm:text-sm opacity-80">Creative mastery</div>
			</div>
		</div>

		<div class="text-center">
			<p class="text-xs sm:text-sm text-[#487DAB]/60 font-serif italic px-4">
				🌙 Silicon Valley magic is being woven for the dreamers... details shimmer on the horizon 🌙
			</p>
		</div>
	</div>
</div>

<!-- Game Jam Sponsors Section -->
<div class="w-full bg-[#44DBC8] py-16 sm:py-24 md:py-32 relative">
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-15 pointer-events-none"
		style="transform: translateY({parallaxOffset * 0.25}px)"
	></div>

	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="text-center mb-12 sm:mb-14 md:mb-16 scroll-reveal">
			<h2 class="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white mb-4 md:mb-6">
				Sponsor Magic ✨
			</h2>
			<p class="text-base sm:text-lg md:text-xl text-white/90 font-serif max-w-3xl mx-auto px-4">
				Join us in creating Silicon Valley's best game development experience
			</p>
		</div>

		<!-- Sponsors Grid - Currently Empty for Future Logos -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-14 md:mb-16">
			<a href="https://vercel.com">
				<div
					class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-8 h-24 sm:h-28 md:h-32 flex items-center justify-center border border-white/30 hover:scale-110 transition-all duration-300 active:translate-y-1 hover:brightness-110 hover:-translate-y-1"
				>
					<img src={vercelLogo} alt="Vercel Logo">
				</div>
			</a>
			
			<a href="https://frame.work/">
				<div
					class="bg-white/60 backdrop-blur-sm rounded-2xl p-2 sm:p-3 md:p-4 h-24 sm:h-28 md:h-32 flex items-center justify-center border border-white/30 hover:scale-110 transition-all duration-300 active:translate-y-1 hover:brightness-110  hover:-translate-y-1"
				>
					<img src={frameworkLogo} alt="Framework Logo">
				</div>
			</a>
			
			<div
				class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 h-24 sm:h-28 md:h-32 flex items-center justify-center border border-white/30"
			>
				<div class="text-white/60 font-serif italic text-xs sm:text-sm">🎮 Coming Soon</div>
			</div>
			<div
				class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 h-24 sm:h-28 md:h-32 flex items-center justify-center border border-white/30"
			>
				<div class="text-white/60 font-serif italic text-xs sm:text-sm">🎮 Coming Soon</div>
			</div>
		</div>

		<div class="text-center floating-gentle">
			<p class="text-base sm:text-lg text-white/80 mb-3 sm:mb-4 px-4">
				Want to craft something magical for the next generation of game creators?
			</p>
			<p class="text-lg sm:text-xl font-semibold text-white mb-6 sm:mb-8 px-4">
				Help us power a $35,000+ prize pool and Silicon Valley's premier game jam ✨
			</p>
			<a
				href="mailto:sponsors@hackclub.com"
				class="inline-block bg-white text-[#44DBC8] text-base sm:text-lg font-bold py-3 px-6 sm:px-8 rounded-full hover:shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 hover:brightness-110 hover:rotate-1 hover:-translate-y-1"
				aria-label="Contact us about sponsorship opportunities"
			>
				Create Magic With Us
			</a>
		</div>
	</div>
</div>

<div class="w-full bg-[#FFFFF8] relative">
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] bg-repeat opacity-10 pointer-events-none z-0"
	></div>
	<div
		class="opacity-60 absolute w-full h-32 bg-[url('brushstroking.png')] bg-repeat-x z-10 bg-size-[100vw_100vh] mix-blend-overlay"
		style="mask-image: url(/footer-clouds.png); mask-size: contain; mask-repeat: repeat-x; -webkit-mask-image: url(/footer-clouds.png); -webkit-mask-size: contain; -webkit-mask-repeat: repeat-x;"
	></div>
	<div
		class="w-full h-32 bg-[#44DBC8] z-5"
		style="mask-image: url(/footer-clouds.png); mask-size: contain; mask-repeat: repeat-x; -webkit-mask-image: url(/footer-clouds.png); -webkit-mask-size: contain; -webkit-mask-repeat: repeat-x;"
	></div>

	<!-- Footer Text -->
	<div class="text-center py-6 sm:py-8 z-20 px-4">
		<p class="text-gray-700 mb-3 sm:mb-4 font-serif italic text-base sm:text-lg">
			🏆 Where Silicon Valley innovation meets game dev magic ✨
		</p>
		<nav aria-label="Footer navigation">
			<div
				class="flex justify-center space-x-4 max-md:flex-col max-md:space-x-0 max-md:space-y-3"
			>
				<a
					href="https://hackclub.com"
					class="underline text-gray-700 hover:text-[#44DBC8] transition-all duration-300 font-serif focus:outline-none focus:ring-2 focus:ring-[#44DBC8]/50 rounded hover:scale-105 text-sm sm:text-base"
					>Hack Club</a
				>
				<a
					href="https://forms.hackclub.com/daydream-rsvp?event=recro0X4uHS1vxztZ"
					class="underline text-gray-700 hover:text-[#44DBC8] transition-all duration-300 font-serif focus:outline-none focus:ring-2 focus:ring-[#44DBC8]/50 rounded hover:scale-105 text-sm sm:text-base"
					>Join the Jam</a
				>
				<a
					href="https://hackclub.com/slack"
					class="underline text-gray-700 hover:text-[#44DBC8] transition-all duration-300 font-serif focus:outline-none focus:ring-2 focus:ring-[#44DBC8]/50 rounded hover:scale-105 text-sm sm:text-base"
					>Join Community</a
				>
				<a
					href="mailto:daydream@hackclub.com"
					class="underline text-gray-700 hover:text-[#44DBC8] transition-all duration-300 font-serif focus:outline-none focus:ring-2 focus:ring-[#44DBC8]/50 rounded hover:scale-105 text-sm sm:text-base"
					>Contact</a
				>
			</div>
		</nav>
	</div>
</div>

<style>
	:global(body) {
		font-family: 'Inter', sans-serif;
		overflow-x: hidden;
		overflow-y: auto;
	}
	:global(html) {
		overflow-x: hidden;
		overflow-y: auto;
	}

	/* Dreamy floating animations */
	:global(.floating-slow) {
		animation:
			float-slow 12s ease-in-out infinite,
			sway-slow 8s ease-in-out infinite;
	}

	:global(.floating-gentle) {
		animation:
			float-gentle 7s ease-in-out infinite,
			sway-gentle 5s ease-in-out infinite;
	}

	:global(.floating-medium) {
		animation:
			float-medium 4s ease-in-out infinite,
			sway-medium 3s ease-in-out infinite;
	}

	@keyframes float-slow {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-15px);
		}
	}

	@keyframes float-gentle {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-8px);
		}
	}

	@keyframes float-medium {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-12px);
		}
	}

	/* Swaying animations for floating elements */
	@keyframes sway-slow {
		0%,
		100% {
			transform: translateX(0px) rotate(0deg);
		}
		25% {
			transform: translateX(8px) rotate(1deg);
		}
		75% {
			transform: translateX(-8px) rotate(-1deg);
		}
	}

	@keyframes sway-gentle {
		0%,
		100% {
			transform: translateX(0px) rotate(0deg);
		}
		50% {
			transform: translateX(5px) rotate(0.5deg);
		}
	}

	@keyframes sway-medium {
		0%,
		100% {
			transform: translateX(0px) rotate(0deg);
		}
		33% {
			transform: translateX(-6px) rotate(-0.8deg);
		}
		66% {
			transform: translateX(6px) rotate(0.8deg);
		}
	}

	/* Hero section load-in animations */
	.animate-in-hero-container {
		animation: fadeInUp 1s ease-out 0.2s both;
	}

	.animate-in-date {
		animation: fadeInUp 0.8s ease-out 0.4s both;
	}

	.animate-in-logo {
		animation: scaleIn 1.2s ease-out 0.6s both;
	}

	.animate-in-plane {
		animation: flyIn 1s ease-out 0.8s both;
	}

	.animate-in-title {
		animation: fadeInUp 0.8s ease-out 1s both;
	}

	.animate-in-underline {
		animation: drawIn 1s ease-out 1.2s both;
	}

	.animate-in-subtitle {
		animation: fadeInUp 0.8s ease-out 1.4s both;
	}

	.animate-in-cta {
		animation: bounceIn 1s ease-out 1.6s both;
	}

	.animate-in-tagline {
		animation: fadeIn 0.8s ease-out 2s both;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes flyIn {
		from {
			opacity: 0;
			transform: translateX(50px) rotate(20deg);
		}
		to {
			opacity: 1;
			transform: translateX(0) rotate(0deg);
		}
	}

	@keyframes drawIn {
		from {
			opacity: 0;
			transform: scaleX(0);
		}
		to {
			opacity: 1;
			transform: scaleX(1);
		}
	}

	@keyframes bounceIn {
		from {
			opacity: 0;
			transform: scale(0.3) translateY(30px);
		}
		50% {
			opacity: 1;
			transform: scale(1.05) translateY(-5px);
		}
		70% {
			transform: scale(0.95) translateY(2px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Scroll reveal animations - start visible for accessibility */
	:global(.scroll-reveal) {
		opacity: 1;
		transform: translateY(0);
		transition:
			opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
			transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		will-change: opacity, transform;
	}

	/* Progressive enhancement - only hide if JS is working */
	:global(.js-loaded .scroll-reveal:not(.animate-in)) {
		opacity: 0;
		transform: translateY(40px);
		transition-delay: 0s;
	}

	:global(.scroll-reveal.animate-in) {
		opacity: 1 !important;
		transform: translateY(0) !important;
		transition-delay: inherit;
	}

	/* Staggered animation delays for grid items */
	:global(.scroll-reveal:nth-child(1)) {
		transition-delay: 0.1s;
	}
	:global(.scroll-reveal:nth-child(2)) {
		transition-delay: 0.2s;
	}
	:global(.scroll-reveal:nth-child(3)) {
		transition-delay: 0.3s;
	}
	:global(.scroll-reveal:nth-child(4)) {
		transition-delay: 0.4s;
	}
	:global(.scroll-reveal:nth-child(5)) {
		transition-delay: 0.5s;
	}
	:global(.scroll-reveal:nth-child(6)) {
		transition-delay: 0.6s;
	}
	:global(.scroll-reveal:nth-child(7)) {
		transition-delay: 0.7s;
	}
	:global(.scroll-reveal:nth-child(8)) {
		transition-delay: 0.8s;
	}

	/* Smooth parallax transitions */
	.hero-ui-parallax,
	.buildings-back-parallax,
	.buildings-front-parallax,
	.cloudy-bg-parallax {
		transition: transform 0.1s ease-out;
	}

	/* Performance optimizations */
	.scroll-reveal {
		will-change: transform, opacity;
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.scroll-reveal {
			transition: none !important;
		}
	}

	/* Mobile performance optimizations */
	@media (max-width: 768px) {
		:global(body) {
			-webkit-overflow-scrolling: touch;
			-webkit-tap-highlight-color: transparent;
		}

		/* Reduce complex animations on mobile */
		:global(.floating-slow),
		:global(.floating-gentle),
		:global(.floating-medium) {
			animation-duration: 6s, 4s !important;
		}

		/* Optimize parallax for mobile */
		.hero-ui-parallax,
		.buildings-back-parallax,
		.buildings-front-parallax,
		.cloudy-bg-parallax {
			transform: none !important;
		}

		/* Better touch targets */
		a {
			min-height: 44px;
			min-width: 44px;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		:global(.scroll-reveal),
		:global(.floating-slow),
		:global(.floating-gentle),
		:global(.floating-medium),
		.animate-in-hero-container,
		.animate-in-date,
		.animate-in-logo,
		.animate-in-plane,
		.animate-in-title,
		.animate-in-underline,
		.animate-in-subtitle,
		.animate-in-cta,
		.animate-in-tagline {
			animation: none !important;
			transition: none !important;
		}

		:global(.hero-ui-parallax),
		:global(.buildings-back-parallax),
		:global(.buildings-front-parallax),
		:global(.cloudy-bg-parallax) {
			transform: none !important;
		}
	}

	/* Focus styles for better accessibility */
	/* Enhanced accessibility and mobile touch support */
	a:focus {
		outline: 2px solid #44dbc8;
		outline-offset: 2px;
	}

	/* Mobile-first responsive typography */
	@media (max-width: 640px) {
		:global(h1) {
			font-size: 1.875rem !important;
		}
		:global(h2) {
			font-size: 1.5rem !important;
		}
		:global(h3) {
			font-size: 1.25rem !important;
		}
		:global(p) {
			font-size: 0.875rem !important;
			line-height: 1.5 !important;
		}
	}

	/* Improved mobile scrolling */
	@supports (-webkit-overflow-scrolling: touch) {
		:global(body) {
			-webkit-overflow-scrolling: touch;
		}
	}

	/* iOS Safari specific fixes */
	@supports (-webkit-appearance: none) {
		:global(body) {
			-webkit-text-size-adjust: 100%;
		}
	}
</style>
