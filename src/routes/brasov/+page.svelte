<script lang="ts">
	import { eventLocation, eventName } from './data.js';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Ticker from '$lib/components/Ticker.svelte';
	import IdeaGenerator from './components/IdeaGenerator.svelte';
	import Location from './components/Location.svelte';
	import FaqSection from './components/FaqSection.svelte';
	import CustomFooter from './components/CustomFooter.svelte';
	import Sponsors from './components/Sponsors.svelte';
	import Schedule from './components/Schedule.svelte';
	import CustomStyles from './components/CustomStyles.svelte';
	import PaperPlane from './components/PaperPlane.svelte';
	import Letter from './components/Letter.svelte';
	import Workshops from './components/Workshops.svelte';
	import CustomParticipantSignUp from './components/CustomParticipantSignUp.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

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
Singapore
Sydney
Mumbai`.split('\n');

	function createSmoothPath(points: Array<{ x: number; y: number }>) {
		if (points.length < 2) return '';

		// Create smooth curves that flow horizontally through points
		const tension = 1.2; // Increased control point distance for smoother curves

		// Configurable angles for each point (in degrees)
		// 0 = horizontal, positive = upward slope, negative = downward slope
		const pointAngles = [0, 0, -10, -10, -10, 0, 0]; // Point 0: center, Point 0.5: left curve, Points 1-4: cards, Point 5: final card

		// Generate control points for smooth curves
		const controlPoints = [];

		for (let i = 0; i < points.length; i++) {
			let cp1, cp2;
			const angleRadians = (pointAngles[i] || 0) * Math.PI / 180; // Convert to radians

			if (i === 0) {
				// First point - start flowing at specified angle
				const next = points[i + 1];
				const distance = Math.sqrt(Math.pow(next.x - points[i].x, 2) + Math.pow(next.y - points[i].y, 2));

				// Start at specified angle - extend further
				const controlDistance = distance * tension * 0.8;

				cp1 = { x: points[i].x, y: points[i].y };
				cp2 = {
					x: points[i].x + Math.cos(angleRadians) * controlDistance,
					y: points[i].y + Math.sin(angleRadians) * controlDistance
				};
			} else if (i === points.length - 1) {
				// Last point - simple straight-down vertical approach
				const prev = points[i - 1];
				const distance = Math.sqrt(Math.pow(points[i].x - prev.x, 2) + Math.pow(points[i].y - prev.y, 2));

				// Create a simple curve that transitions smoothly to vertical
				const controlDistance = distance * tension * 0.4; // Reduced for simpler curve

				// First control point - minimal horizontal extension from previous point
				cp1 = {
					x: prev.x + (points[i].x - prev.x) * 0.7, // Move most of the way horizontally
					y: prev.y + (points[i].y - prev.y) * 0.3   // Move only slightly vertically
				};

				// Second control point - directly above target for straight-down approach
				cp2 = {
					x: points[i].x, // Directly above the target point
					y: points[i].y - controlDistance * 0.5 // Close approach from above
				};
			} else {
				// Middle points - flow at specified angle through the point
				const prev = points[i - 1];
				const next = points[i + 1];

				// Calculate distances for proportional control
				const prevDistance = Math.sqrt(Math.pow(points[i].x - prev.x, 2) + Math.pow(points[i].y - prev.y, 2));
				const nextDistance = Math.sqrt(Math.pow(next.x - points[i].x, 2) + Math.pow(next.y - points[i].y, 2));

				// Determine if we're going left-to-right or right-to-left based on position in sequence
				const isEven = i % 2 === 0;
				const flowDirection = isEven ? 1 : -1; // Even indices flow right, odd flow left

				// Control distances based on adjacent point distances - extend much further
				const leftControlDistance = prevDistance * tension * 0.7;
				const rightControlDistance = nextDistance * tension * 0.7;

				if (flowDirection > 0) {
					// Flowing left to right at specified angle
					cp1 = {
						x: points[i].x - Math.cos(angleRadians) * leftControlDistance,
						y: points[i].y - Math.sin(angleRadians) * leftControlDistance
					};
					cp2 = {
						x: points[i].x + Math.cos(angleRadians) * rightControlDistance,
						y: points[i].y + Math.sin(angleRadians) * rightControlDistance
					};
				} else {
					// Flowing right to left at specified angle (flip direction)
					cp1 = {
						x: points[i].x + Math.cos(angleRadians) * leftControlDistance,
						y: points[i].y + Math.sin(angleRadians) * leftControlDistance
					};
					cp2 = {
						x: points[i].x - Math.cos(angleRadians) * rightControlDistance,
						y: points[i].y - Math.sin(angleRadians) * rightControlDistance
					};
				}
			}

			controlPoints.push({ cp1, cp2 });
		}

		// Build the smooth path
		let path = `M ${points[0].x} ${points[0].y}`;

		for (let i = 1; i < points.length; i++) {
			const prevControls = controlPoints[i - 1];
			const currControls = controlPoints[i];

			path += ` C ${prevControls.cp2.x} ${prevControls.cp2.y}, ${currControls.cp1.x} ${currControls.cp1.y}, ${points[i].x} ${points[i].y}`;
		}

		return path;
	}

	function getPointAlongPath(points: Array<{ x: number; y: number }>, percentage: number) {
		if (points.length < 2) return { x: 0, y: 0, angle: 0 };

		// Generate the same control points as the path
		const tension = 1.2;
		const pointAngles = [0, 0, -10, -10, -10, 0, 0];
		const controlPoints = [];

		for (let i = 0; i < points.length; i++) {
			let cp1, cp2;
			const angleRadians = (pointAngles[i] || 0) * Math.PI / 180;

			if (i === 0) {
				const next = points[i + 1];
				const distance = Math.sqrt(Math.pow(next.x - points[i].x, 2) + Math.pow(next.y - points[i].y, 2));
				const controlDistance = distance * tension * 0.8;

				cp1 = { x: points[i].x, y: points[i].y };
				cp2 = {
					x: points[i].x + Math.cos(angleRadians) * controlDistance,
					y: points[i].y + Math.sin(angleRadians) * controlDistance
				};
			} else if (i === points.length - 1) {
				const prev = points[i - 1];
				const distance = Math.sqrt(Math.pow(points[i].x - prev.x, 2) + Math.pow(points[i].y - prev.y, 2));
				const controlDistance = distance * tension * 0.4;

				cp1 = {
					x: prev.x + (points[i].x - prev.x) * 0.7,
					y: prev.y + (points[i].y - prev.y) * 0.3
				};

				cp2 = {
					x: points[i].x,
					y: points[i].y - controlDistance * 0.5
				};
			} else {
				const prev = points[i - 1];
				const next = points[i + 1];

				const prevDistance = Math.sqrt(Math.pow(points[i].x - prev.x, 2) + Math.pow(points[i].y - prev.y, 2));
				const nextDistance = Math.sqrt(Math.pow(next.x - points[i].x, 2) + Math.pow(next.y - points[i].y, 2));

				const isEven = i % 2 === 0;
				const flowDirection = isEven ? 1 : -1;

				const leftControlDistance = prevDistance * tension * 0.7;
				const rightControlDistance = nextDistance * tension * 0.7;

				if (flowDirection > 0) {
					cp1 = {
						x: points[i].x - Math.cos(angleRadians) * leftControlDistance,
						y: points[i].y - Math.sin(angleRadians) * leftControlDistance
					};
					cp2 = {
						x: points[i].x + Math.cos(angleRadians) * rightControlDistance,
						y: points[i].y + Math.sin(angleRadians) * rightControlDistance
					};
				} else {
					cp1 = {
						x: points[i].x + Math.cos(angleRadians) * leftControlDistance,
						y: points[i].y + Math.sin(angleRadians) * leftControlDistance
					};
					cp2 = {
						x: points[i].x - Math.cos(angleRadians) * rightControlDistance,
						y: points[i].y - Math.sin(angleRadians) * rightControlDistance
					};
				}
			}

			controlPoints.push({ cp1, cp2 });
		}

		// Calculate which segment and position within that segment
		const segmentCount = points.length - 1;
		const segmentPercentage = percentage * segmentCount;
		const segmentIndex = Math.floor(segmentPercentage);
		const t = segmentPercentage - segmentIndex;

		// Clamp to valid range
		const clampedIndex = Math.min(segmentIndex, segmentCount - 1);
		const clampedT = clampedIndex === segmentIndex ? t : 1;

		// Get the Bézier curve points for this segment
		const p0 = points[clampedIndex];
		const p1 = controlPoints[clampedIndex].cp2;
		const p2 = controlPoints[clampedIndex + 1].cp1;
		const p3 = points[clampedIndex + 1];

		// Calculate position on cubic Bézier curve
		const x = Math.pow(1 - clampedT, 3) * p0.x +
			3 * Math.pow(1 - clampedT, 2) * clampedT * p1.x +
			3 * (1 - clampedT) * Math.pow(clampedT, 2) * p2.x +
			Math.pow(clampedT, 3) * p3.x;

		const y = Math.pow(1 - clampedT, 3) * p0.y +
			3 * Math.pow(1 - clampedT, 2) * clampedT * p1.y +
			3 * (1 - clampedT) * Math.pow(clampedT, 2) * p2.y +
			Math.pow(clampedT, 3) * p3.y;

		// Calculate tangent for rotation
		const dx = 3 * Math.pow(1 - clampedT, 2) * (p1.x - p0.x) +
			6 * (1 - clampedT) * clampedT * (p2.x - p1.x) +
			3 * Math.pow(clampedT, 2) * (p3.x - p2.x);

		const dy = 3 * Math.pow(1 - clampedT, 2) * (p1.y - p0.y) +
			6 * (1 - clampedT) * clampedT * (p2.y - p1.y) +
			3 * Math.pow(clampedT, 2) * (p3.y - p2.y);

		let angle = Math.atan2(dy, dx) * 180 / Math.PI;

		// Keep the plane oriented to follow the curve naturally
		// Allow flipping but ensure it's always pointing in the direction of travel

		return { x, y, angle };
	}


	let showVideoPopup = false;

	// Generate ticker text from cities array (constant)
	const tickerText = cities.join(' • ');

	// Particle system
	let particles: Array<{
		id: number;
		x: number;
		y: number;
		opacity: number;
		rotation: number;
		velocityY: number;
		velocityX: number;
		scale: number
	}> = [];
	let particleIdCounter = 0;
	let particleContainer: HTMLElement;
	let isTabVisible = true;
	const particleSpeedScale = 0.6;

	function openVideoPopup() {
		// Check if screen is small (mobile/tablet)
		if (window.innerWidth <= 768) {
			// Open video directly in new tab for small screens
			window.open('https://www.youtube.com/watch?v=O44y8TeJrNE', '_blank');
		} else {
			// Show popup for larger screens
			showVideoPopup = true;
		}
	}

	function closeVideoPopup() {
		showVideoPopup = false;
	}


	function setupPlaneAnimation() {
		const container = document.getElementById('islands-container');
		const airplane = document.getElementById('paper-airplane');

		if (!container || !airplane) return;

		// Create an object to animate progress
		const planeProgress = { value: 0 };

		// Get points for path calculation
		const getPoints = () => {
			const containerRect = container.getBoundingClientRect();
			const points: Array<{ x: number; y: number }> = [];
			const pointIds = ['0', '0.5', '1', '2', '3', '4', '5'];
			pointIds.forEach(id => {
				const element = document.querySelector(`[data-point="${id}"]`);
				if (element) {
					const rect = element.getBoundingClientRect();
					points.push({
						x: rect.left + rect.width / 2 - containerRect.left,
						y: rect.top + rect.height / 2 - containerRect.top
					});
				}
			});
			return points;
		};

		// Update function that gets called as progress changes
		const updatePlanePosition = () => {
			const points = getPoints();
			if (points.length > 0) {
				const airplanePos = getPointAlongPath(points, planeProgress.value);

				gsap.set(airplane, {
					left: `${airplanePos.x}px`,
					top: `${airplanePos.y}px`,
					rotation: airplanePos.angle,
					scaleY: Math.abs(airplanePos.angle) > 90 ? -1 : 1,
					transformOrigin: 'center center',
					transform: `translate(-50%, calc(-50% - 0.5rem))`
				});
			}
		};

		// Create animation timeline
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				start: 'top 100%',
				end: 'bottom 100%',
				scrub: 1.5
				// markers: true,
			}
		});

		// Animate the progress value
		tl.to(planeProgress, {
			value: 1,
			duration: 1,
			ease: 'none',
			onUpdate: updatePlanePosition
		});

		return tl;
	}

	function createParticle() {
		if (!particleContainer || !isTabVisible) return;

		// Find the visible button - mobile first, then desktop
		const buttons = document.querySelectorAll('a[href="https://forms.hackclub.com/daydream-stickers"]');
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
		const spawnWidth = buttonRect.width - (edgeInset * 2);
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

		particles = particles.map(particle => ({
			...particle,
			x: particle.x + particle.velocityX,
			y: particle.y + particle.velocityY,
			opacity: particle.opacity - 0.01,
			rotation: particle.rotation + 2,
			scale: particle.scale
		})).filter(particle => particle.opacity > 0);
	}

	function animateParticles() {
		updateParticles();
		requestAnimationFrame(animateParticles);
	}

	function handleVisibilityChange() {
		isTabVisible = !document.hidden;
	}

	function updatePath() {
		const container = document.getElementById('islands-container');
		const pathElement = document.getElementById('dotted-path');

		if (!container || !pathElement) return;

		const containerRect = container.getBoundingClientRect();
		const points: Array<{ x: number; y: number }> = [];

		// Get points in order by data-point attribute
		const pointIds = ['0', '0.5', '1', '2', '3', '4', '5'];
		pointIds.forEach(id => {
			const element = document.querySelector(`[data-point="${id}"]`);
			if (element) {
				const rect = element.getBoundingClientRect();
				points.push({
					x: rect.left + rect.width / 2 - containerRect.left,
					y: rect.top + rect.height / 2 - containerRect.top
				});
			}
		});

		const pathData = createSmoothPath(points);
		pathElement.setAttribute('d', pathData);
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

		// Initial path calculation
		setTimeout(() => {
			updatePath();
			setupPlaneAnimation();
		}, 100);

		// Update on resize
		const handleResize = () => {
			updatePath();
			ScrollTrigger.refresh();
		};
		window.addEventListener('resize', handleResize);

		// Handle tab visibility changes
		document.addEventListener('visibilitychange', handleVisibilityChange);

		// Start particle animation
		animateParticles();

		// Start particle spawning
		const particleInterval = setInterval(createParticle, 250);

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			clearInterval(particleInterval);
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	});
</script>

<CustomStyles />

<div
	class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>

<div
	class="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-[#CCF4FD] to-[#B8D9F8] bg-blend-overlay relative">
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-30 pointer-events-none"></div>

	<!-- Cloudy Background -->
	<div
		class="cloudy-bg-parallax absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[80vh] bg-[url(/cloudy-bg.png)] opacity-30 bg-cover bg-no-repeat bg-top pointer-events-none"></div>

	<div
		class="buildings-back-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-back.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"></div>

	<Ticker {tickerText} />

	<!-- brush texture clipped to back buildings -->
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat pointer-events-none opacity-100 lg:-translate-y-15 bg-center mix-blend-overlay"
		style="mask-image: url('/buildings-back.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center top; -webkit-mask-image: url('/buildings-back.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center top;"></div>

	<div
		class="buildings-front-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-front.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"></div>
	<!-- brush texture clipped to front buildings -->
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat pointer-events-none opacity-100 lg:-translate-y-15 bg-center mix-blend-overlay"
		style="mask-image: url('/buildings-front.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center top; -webkit-mask-image: url('/buildings-front.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center top;"></div>
	<div class="hero-ui-parallax flex flex-col items-center justify-center text-center relative z-5 -translate-y-2">
		<div class="inline-block relative">
			<div class="h-12"></div>
			<!-- space for the ship -->
			<h2
				class="text-xl font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent absolute left-1/2 max-sm:translate-y-4 max-sm:mb-0 max-md:-mb-8 md:left-[calc(50%+4rem)] -translate-x-1/2 bottom-8 italic w-max md:text-lg max-sm:text-lg"
			>
				27 și 28 Septembrie, 2025
			</h2>
			<img src="daydream.png" alt="Daydream" class="h-40 mb-6 w-auto object-contain max-w-full px-4" />
			<a href="https://hackclub.com"
				 class="absolute top-0 -right-6 max-sm:right-0 max-sm:scale-80 animate-hover ![animation-delay:0.9s] ![--hover:-0.2rem]">
				<img src="flag-plane.png" alt="Hack Club" class="h-28">
			</a>
		</div>
		<div class="relative inline-block px-4">
			<h3
				class="text-3xl italic font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent w-max max-sm:text-2xl mx-auto"
			>
				Hackathon pentru adolescenti
			</h3>
			<img
				src="underline.svg"
				alt=""
				class="absolute left-1/2 -translate-x-1/2 -mt-1 h-auto scale-115"
			/>
			<h4
				class="text-2xl opacity-90 mt-2 font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent max-sm:text-xl"
			>
				Organizat de adolescenti
			</h4>
		</div>

		<CustomParticipantSignUp {eventName} />
	</div>

	<!-- <img src="hot-air-balloon.png" alt="" class="absolute w-1/8 right-32 bottom-40 z-20"> -->
	<!-- <img src="hot-air-balloon.png" alt="" class="absolute w-1/12 left-36 bottom-81 z-20"> -->

	<!-- Particle container -->
	<div bind:this={particleContainer} class="absolute inset-0 pointer-events-none z-40 opacity-70">
		{#each particles as particle (particle.id)}
			<img
				src="particle.png"
				alt=""
				class="absolute w-3 h-3 pointer-events-none"
				style="left: {particle.x}px; top: {particle.y}px; opacity: {particle.opacity}; transform: rotate({particle.rotation}deg) scale({particle.scale});"
			/>
		{/each}
	</div>


	<img src="/clouds-top-middle-bg.svg" alt="" class="absolute left-5/12 -translate-x-1/2 w-7/12 -bottom-24">
	<div
		class="absolute left-5/12 -translate-x-1/2 w-7/12 -bottom-24 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full"
		style="mask-image: url('/clouds-top-middle-bg.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/clouds-top-middle-bg.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"></div>

	<img src="/clouds-top-right-bg.svg" alt="" class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2">
	<div
		class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full"
		style="mask-image: url('/clouds-top-right-bg.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/clouds-top-right-bg.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"></div>

	<img src="/clouds-top-left-bg.svg" alt="" class="absolute left-0 w-3/12 -bottom-12  translate-y-1/2">
	<div
		class="absolute left-0 w-3/12 -bottom-12 translate-y-1/2 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full"
		style="mask-image: url('/clouds-top-left-bg.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/clouds-top-left-bg.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"></div>

	<img src="/clouds-top-middle.png" alt=""
			 class="absolute left-5/12 -translate-x-1/2 w-7/12 -bottom-24 z-20 pointer-events-none">
	<img src="/clouds-top-right.png" alt=""
			 class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2 z-20 pointer-events-none">
	<img src="/clouds-top-left.png" alt=""
			 class="absolute left-0 w-3/12 -bottom-12  translate-y-1/2 z-20 pointer-events-none">


	<!-- Desktop stickers button (bottom left) -->
	<a
		href="https://forms.hackclub.com/daydream-stickers"
		target="_blank"
		class="hidden md:block absolute bottom-16 left-16 z-50 w-max px-4 py-2 bg-pink border-b-2 border-b-pink-dark text-white rounded-full active:transform active:translate-y-0.5 transition-all duration-100 font-sans cursor-pointer overflow-visible hover:shadow-[0_2px_0_0_theme(colors.pink.dark)] hover:-translate-y-[2px] active:border-transparent active:shadow-none"
	>
		Obține stickere gratuite
		<img
			src="button-clouds.svg"
			alt=""
			class="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto object-contain pointer-events-none"
		>
		<img
			src="rock-sticker.png"
			alt=""
			class="absolute bottom-2 right-3 translate-2/3 w-18 h-18 object-contain pointer-events-none"
			style="transform: rotate(-15deg);"
		>
	</a>
</div>

<Letter />

<Schedule />

<Workshops />

<Sponsors />

<!-- Gamejam Text Section -->
<div class="w-full bg-[#FCEFC5] flex justify-center py-16 relative overflow-hidden max-h-[400px]">
	<!-- Cloud backdrop for gamejam text -->
	<div class="absolute inset-0 w-full h-full pointer-events-none z-1">
		<img src="/cloud-cover-1.png" alt="" class="w-full h-full object-cover">
		<div class="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2" data-point="0"></div>
		<div class="absolute top-1/2 left-1/4 w-1 h-1 -translate-x-1/2 -translate-y-1/2" data-point="0.5"></div>
	</div>

	<div
		class="relative w-10/12 h-auto object-contain cursor-text flex flex-row max-lg:flex-wrap md:translate-y-0 max-lg:translate-y-1/5 items-center justify-center align-middle max-w-5xl z-50">
		<img src="gamejam-1-alt.png" alt="Here's How You Win a" class="flex-shrink min-w-0 object-contain">
		<img src="gamejam-2.png" alt="Game Jam" class="flex-shrink min-w-0 object-contain">
	</div>
</div>

<PaperPlane />

<div
	class="w-full bg-gradient-to-b from-[#FDC5D1] to-[#FAE3C9] items-center justify-center px-0 md:px-8 relative pt-36">
	<Location />
	<!-- Macintosh Section -->
	<IdeaGenerator />
</div>


<FaqSection />

<CustomFooter />