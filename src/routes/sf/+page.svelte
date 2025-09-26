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
			const angleRadians = (pointAngles[i] || 0) * (Math.PI / 180); // Convert to radians

			if (i === 0) {
				// First point - start flowing at specified angle
				const next = points[i + 1];
				const distance = Math.sqrt(
					Math.pow(next.x - points[i].x, 2) + Math.pow(next.y - points[i].y, 2)
				);

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
				const distance = Math.sqrt(
					Math.pow(points[i].x - prev.x, 2) + Math.pow(points[i].y - prev.y, 2)
				);

				// Create a simple curve that transitions smoothly to vertical
				const controlDistance = distance * tension * 0.4; // Reduced for simpler curve

				// First control point - minimal horizontal extension from previous point
				cp1 = {
					x: prev.x + (points[i].x - prev.x) * 0.7, // Move most of the way horizontally
					y: prev.y + (points[i].y - prev.y) * 0.3 // Move only slightly vertically
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
				const prevDistance = Math.sqrt(
					Math.pow(points[i].x - prev.x, 2) + Math.pow(points[i].y - prev.y, 2)
				);
				const nextDistance = Math.sqrt(
					Math.pow(next.x - points[i].x, 2) + Math.pow(next.y - points[i].y, 2)
				);

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
			const angleRadians = (pointAngles[i] || 0) * (Math.PI / 180);

			if (i === 0) {
				const next = points[i + 1];
				const distance = Math.sqrt(
					Math.pow(next.x - points[i].x, 2) + Math.pow(next.y - points[i].y, 2)
				);
				const controlDistance = distance * tension * 0.8;

				cp1 = { x: points[i].x, y: points[i].y };
				cp2 = {
					x: points[i].x + Math.cos(angleRadians) * controlDistance,
					y: points[i].y + Math.sin(angleRadians) * controlDistance
				};
			} else if (i === points.length - 1) {
				const prev = points[i - 1];
				const distance = Math.sqrt(
					Math.pow(points[i].x - prev.x, 2) + Math.pow(points[i].y - prev.y, 2)
				);
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

				const prevDistance = Math.sqrt(
					Math.pow(points[i].x - prev.x, 2) + Math.pow(points[i].y - prev.y, 2)
				);
				const nextDistance = Math.sqrt(
					Math.pow(next.x - points[i].x, 2) + Math.pow(next.y - points[i].y, 2)
				);

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
		const x =
			Math.pow(1 - clampedT, 3) * p0.x +
			3 * Math.pow(1 - clampedT, 2) * clampedT * p1.x +
			3 * (1 - clampedT) * Math.pow(clampedT, 2) * p2.x +
			Math.pow(clampedT, 3) * p3.x;

		const y =
			Math.pow(1 - clampedT, 3) * p0.y +
			3 * Math.pow(1 - clampedT, 2) * clampedT * p1.y +
			3 * (1 - clampedT) * Math.pow(clampedT, 2) * p2.y +
			Math.pow(clampedT, 3) * p3.y;

		// Calculate tangent for rotation
		const dx =
			3 * Math.pow(1 - clampedT, 2) * (p1.x - p0.x) +
			6 * (1 - clampedT) * clampedT * (p2.x - p1.x) +
			3 * Math.pow(clampedT, 2) * (p3.x - p2.x);

		const dy =
			3 * Math.pow(1 - clampedT, 2) * (p1.y - p0.y) +
			6 * (1 - clampedT) * clampedT * (p2.y - p1.y) +
			3 * Math.pow(clampedT, 2) * (p3.y - p2.y);

		let angle = (Math.atan2(dy, dx) * 180) / Math.PI;

		// Keep the plane oriented to follow the curve naturally
		// Allow flipping but ensure it's always pointing in the direction of travel

		return { x, y, angle };
	}

	let showVideoPopup = false;

	// Generate ticker text from cities array - constant for local event
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
		scale: number;
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
			pointIds.forEach((id) => {
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

		const button = document.querySelector('a[href="https://forms.hackclub.com/daydream-stickers"]');
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

	function updatePath() {
		const container = document.getElementById('islands-container');
		const pathElement = document.getElementById('dotted-path');

		if (!container || !pathElement) return;

		const containerRect = container.getBoundingClientRect();
		const points: Array<{ x: number; y: number }> = [];

		// Get points in order by data-point attribute
		const pointIds = ['0', '0.5', '1', '2', '3', '4', '5'];
		pointIds.forEach((id) => {
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

	<!-- Cloudy Background -->
	<div
		class="cloudy-bg-parallax absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[80vh] bg-[url(/cloudy-bg.png)] opacity-30 bg-cover bg-no-repeat bg-top pointer-events-none"
	></div>

	<div
		class="buildings-back-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-back.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"
	></div>

	<!-- Animated text ticker along curvy line -->
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
		class="hero-ui-parallax flex flex-col items-center justify-center text-center relative z-30 -translate-y-2"
	>
		<div class="inline-block relative">
			<div class="h-12"></div>
			<!-- space for the ship -->
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

		<div class="mt-8 flex flex-col items-center gap-3 max-md:scale-90">
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

	<!-- Particle container -->
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
		class="absolute left-5/12 -translate-x-1/2 w-7/12 -bottom-24 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full"
		style="mask-image: url('/clouds-top-middle-bg.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/clouds-top-middle-bg.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"
	></div>

	<img
		src="/clouds-top-right-bg.svg"
		alt=""
		class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2"
	/>
	<div
		class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full"
		style="mask-image: url('/clouds-top-right-bg.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/clouds-top-right-bg.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"
	></div>

	<img
		src="/clouds-top-left-bg.svg"
		alt=""
		class="absolute left-0 w-3/12 -bottom-12 translate-y-1/2"
	/>
	<div
		class="absolute left-0 w-3/12 -bottom-12 translate-y-1/2 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full"
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
</div>

<div class="w-full relative flex items-start justify-center">
	<!-- background -->
	<div class="absolute top-0 left-0 w-full h-full -z-50 bg-[#FCEFC5]"></div>
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-30 pointer-events-none -z-40"
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
				Dear Hackers, Musicians, and Artists,
				<img
					src="/underline.svg"
					alt=""
					class="absolute left-0 -bottom-3 w-full h-auto opacity-70"
				/>
			</h2>

			<div class="text-[#8B4513] font-serif text-xl leading-relaxed space-y-8">
				<p>Welcome to Hack Club's newest adventure. This fall we invite you to join us for Daydream, the world's biggest Game Jam happening simultaneously in 100 cities.</p>

				<p class="font-bold text-2xl">Hack Club wants you to make a game this fall.</p>

				<p>Don't consider yourself a game dev? No problem - we have tons of online and in-person workshops for you to make your first game! </p>

				<p>This fall, we invite you to learn something new, make something you're really proud of, meet new friends, and go on an incredible adventure together.</p>

				<p class="mb-2">With love,</p>

				<p class="italic text-2xl opacity-85">Augie and Renran from Hack Club HQ</p>
			</div>
		</div>
	</div>

	<div
		class="w-full absolute z-30 max-h-64 bottom-0 max-xl:translate-y-1/4 max-lg:translate-y-1/2 pointer-events-none"
	>
		<img src="/cloud-cover-1.png" alt="" class="w-full h-full object-contain" />
		<div
			class="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2"
			data-point="0"
		></div>
		<div
			class="absolute top-1/2 left-1/4 w-1 h-1 -translate-x-1/2 -translate-y-1/2"
			data-point="0.5"
		></div>
	</div>
	<div
		class="absolute -bottom-44 left-1/2 -translate-x-1/2 w-10/12 h-auto object-contain z-100 cursor-text flex flex-row max-md:flex-wrap items-center justify-center align-middle max-w-5xl"
	>
		<img
			src="gamejam-1-alt.png"
			alt="Here's How You Win a"
			class="flex-shrink min-w-0 object-contain"
		/>
		<img src="/gamejam-2.png" alt="Game Jam" class="flex-shrink min-w-0 object-contain" />
	</div>
</div>
<div class="w-full h-64 bg-[#FCEFC5]"></div>

<div
	class="flex flex-row flex-wrap w-full h-auto bg-gradient-to-b from-[#FCEFC5] to-[#FEC1CF] px-36 max-md:px-8 pb-50 max-sm:pb-24 relative xl:pt-12 2xl:pt-48"
	id="islands-container"
>
	<img src="/clouds-left-2.png" alt="" class="absolute left-0 w-3/12 top-12" />
	<img src="/clouds-left-3.png" alt="" class="absolute left-0 w-2/12 bottom-32" />
	<img src="/clouds-right-2.png" alt="" class="absolute right-0 w-3/12 bottom-0" />

	<!-- SVG Path Overlay -->
	<svg class="absolute inset-0 w-full h-full pointer-events-none z-0" id="path-svg">
		<path
			id="dotted-path"
			stroke="rgba(255,255,255,0.5)"
			stroke-width="3"
			fill="none"
			stroke-dasharray="8,8"
			opacity="0.7"
		></path>
	</svg>

	<img
		src="/paper-airplane.png"
		alt="Paper airplane"
		class="h-16 absolute z-10"
		id="paper-airplane"
	/>

	<div class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full z-10">
		<div class="relative translate-y-8 max-md:translate-y-4 z-30">
			<img
				src="/letter-1-front.png"
				alt=""
				class="object-contain absolute -bottom-16 -left-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.7s] z-20"
			/>
			<img
				src="/letter-1-back.png"
				alt=""
				class="object-contain absolute -bottom-16 -left-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.7s] z-10"
			/>
			<div
				class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:1.7s] z-20"
				data-point="1"
			>
				<img src="/paper1.png" alt="" class="w-full h-full object-contain" />
				<div
					class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center"
				>
					<span class="font-sans text-[#E472AB] font-bold text-[1.3rem] mr-1">#1:</span> Sign up for
					Daydream San Francisco
				</div>
			</div>
		</div>
		<img
			src="/island-1.png"
			alt=""
			class="w-72 h-72 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:0.8s] z-0"
		/>
	</div>

	<div
		class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full translate-y-24 max-md:translate-y-8 z-10"
	>
		<div class="relative translate-y-24 max-md:translate-y-4 z-30">
			<img
				src="/letter-2-front.png"
				alt=""
				class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.1s] z-20"
			/>
			<img
				src="/letter-2-back.png"
				alt=""
				class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.1s] z-10"
			/>
			<div
				class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:0.3s] z-20"
				data-point="2"
			>
				<img src="/paper2.png" alt="" class="w-full h-full object-contain" />
				<div
					class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center"
				>
					<span class="font-sans text-[#639DEB] font-bold text-[1.3rem] mr-1">#2:</span> Find a team
					of other teenagers at the event
				</div>
			</div>
		</div>
		<img
			src="/island-3.png"
			alt=""
			class="w-86 h-86 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:1.2s] z-0"
		/>
	</div>
	<div
		class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full -translate-x-12 max-md:translate-x-0 max-md:translate-y-8 z-10"
	>
		<div class="relative translate-y-8 max-md:translate-y-4 z-30">
			<img
				src="/letter-3-front.png"
				alt=""
				class="object-contain absolute -bottom-18 left-24 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.9s] z-20"
			/>
			<img
				src="/letter-3-back.png"
				alt=""
				class="object-contain absolute -bottom-18 left-24 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.9s] z-10"
			/>
			<div
				class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:1.4s] z-20"
				data-point="3"
			>
				<img src="/paper3.png" alt="" class="w-full h-full object-contain" />
				<div
					class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center"
				>
					<span class="font-sans text-[#AB68E2] font-bold text-[1.3rem] mr-1">#3:</span> Start
					building your game - <u>no experience needed</u>
				</div>
			</div>
		</div>
		<img
			src="/island-2.png"
			alt=""
			class="w-72 h-72 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:2.1s] z-0"
		/>
	</div>
	<div
		class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full translate-y-30 max-md:translate-y-8 z-10"
	>
		<div class="relative translate-y-24 max-md:translate-y-4 z-30">
			<img
				src="/letter-4-front.png"
				alt=""
				class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.6s] z-20"
			/>
			<img
				src="/letter-4-back.png"
				alt=""
				class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.6s] z-10"
			/>
			<div
				class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:2.3s] z-20"
				data-point="4"
			>
				<img src="/paper4.png" alt="" class="w-full h-full object-contain" />
				<div
					class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center"
				>
					<span class="font-sans text-[#F2993E] font-bold text-[1.3rem] mr-1">#4:</span> Attend workshops
					or talk to one of our mentors for help
				</div>
			</div>
		</div>
		<img
			src="/island-4.png"
			alt=""
			class="w-88 h-88 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:0.5s] z-0"
		/>
	</div>

	<!-- Final Card -->
	<div
		class="flex flex-col items-center w-full basis-full translate-y-40 max-md:translate-y-12 z-20"
	>
		<div class="relative">
			<div
				class="bg-[url('/card-final.png')] bg-contain bg-no-repeat bg-center text-2xl font-serif pt-24 px-8 w-128 h-96 text-center max-md:w-80 max-md:h-80 max-md:text-xl max-md:pt-16 animate-hover ![--hover:-0.15rem] ![animation-delay:1.9s]"
				data-point="5"
			>
				<span class="font-sans text-[#F2CC32] font-bold text-[1.5rem] mr-1">#5:</span> Share what you
				made with the world
			</div>
		</div>
	</div>

	<img
		src="/clouds-pink-left.png"
		alt=""
		class="absolute left-0 w-5/12 bottom-0 translate-y-32 z-50 pointer-events-none"
	/>
	<img
		src="/clouds-pink-right.png"
		alt=""
		class="absolute right-0 w-5/12 bottom-0 translate-y-32 z-50 pointer-events-none"
	/>

	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none bg-position-[0_100vh]"
	></div>
</div>

<div class="h-48 w-full bg-gradient-to-b from-[#FEC1CF] to-[#FCEFC5] rounded-lg shadow-lg"></div>

<div class="w-full bg-[#FCEFC5] relative flex flex-col items-center justify-center px-4 pb-24 space-y-24 relative after:content-[''] after:absolute after:w-full after:h-[150px] after:pointer-events-none after:left-0 after:bottom-0 after:bg-[linear-gradient(to_bottom,_#FCEFC5,_#FDC5D1)]">
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
	<div class="mt-12 flex flex-wrap justify-center items-center gap-8 z-10">
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
</div>
<!-- Billboard Section for Schedule & Sponsors -->

<!-- Schedule Billboard -->
{#if data.sf_data?.schedule}
	{@const scheduleData = [data.sf_data.schedule.saturday, data.sf_data.schedule.sunday]}
	<div class="w-full bg-[#FCEFC5] py-16 px-8 flex justify-center">
		<div class="relative max-w-4xl w-full">
			<!-- Billboard Container -->
			<div
				class="relative bg-[#f0f9ff] border-[10px] border-b-[16px] border-[#888896] rounded-lg rounded-b-xl mx-auto z-40"
			>
				<!-- Billboard Lights (top) -->
				<img
					src="/billboard-lights.png"
					alt=""
					class="absolute top-0 left-0 w-full h-auto object-contain pointer-events-none z-10 -translate-y-[calc(100%+9px)]"
				/>

				<!-- Header Section -->
				<div
					class="w-full bg-[url('/billboard-bg-texture.png')] bg-contain bg-repeat py-6 relative"
					style="border-bottom: 8px solid #B4B4C5;"
				>
					<h2 class="text-4xl font-serif text-[#F0F0FF] text-center">Schedule</h2>
					<!-- Brush texture overlay for header -->
					<div
						class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
					></div>
				</div>

				<!-- Main Content Area -->
				<div class="relative bg-gradient-to-b from-[#CCF4FD] to-[#AECDF6] px-8 pt-8 pb-16">
					<!-- Brush texture overlay for content -->
					<div
						class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
					></div>

					<!-- Schedule Content -->
					<div class="relative z-10">
						{#each scheduleData as day, dayIndex}
							<div class="bg-white/50 py-6 -mx-8 {dayIndex < scheduleData.length - 1 ? 'mb-8' : ''}">
								<h3
									class="text-2xl font-sans font-bold text-[#335969] mb-6 text-center px-8 max-sm:text-xl max-sm:px-4"
								>
									{day.title}
								</h3>

								<div class="max-w-xl mx-auto px-4">
									{#each day.items as item, index}
										<div class="flex items-center justify-between py-2">
											<span class="text-lg font-sans text-[#477783]">{item.event}</span>
											<span class="text-lg font-sans text-[#477783]">{item.time}</span>
										</div>
										{#if index < day.items.length - 1}
											<div class="h-[2px] bg-white/30"></div>
										{/if}
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Billboard Bars (bottom) -->
				<div
					class="absolute bottom-0 -left-[5px] w-[calc(100%+10px)] h-6 bg-[url('/billboard-bars.png')] bg-repeat-x bg-contain bg-center pointer-events-none z-10 border-[#9898a7] border-x-[6px]"
				></div>
			</div>

			<!-- Billboard Pillars -->
			<div
				class="absolute top-1/2 left-[15%] w-[10vw] max-w-12 -bottom-12 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain"
				style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
			>
				<div
					class="absolute bottom-0 left-0 w-full h-auto bg-[url('/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"
				></div>
			</div>
			<div
				class="absolute top-1/2 right-[15%] w-[10vw] max-w-12 -bottom-12 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain"
				style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
			>
				<div
					class="absolute bottom-0 left-0 w-full h-auto bg-[url('/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"
				></div>
			</div>
		</div>
	</div>
{/if}

<!-- Sponsors Billboard -->
{#if data.sf_data?.sponsors && Object.keys(data.sf_data.sponsors).length > 0}
	{@const sponsors = tierOrder.flatMap(tier => data.sf_data.sponsors[tier] || [])}
	<div class="w-full bg-[#FCEFC5] pb-16 pt-6 px-8 flex justify-center">
		<div class="relative max-w-4xl w-full">
			<!-- Billboard Container -->
			<div
				class="relative bg-[#f0f9ff] border-[10px] border-b-[16px] border-[#888896] rounded-lg rounded-b-xl mx-auto z-40"
			>
				<!-- Header Section -->
				<div
					class="w-full bg-[url('/billboard-bg-texture.png')] bg-contain bg-repeat py-6 relative"
					style="border-bottom: 8px solid #B4B4C5;"
				>
					<h2 class="text-4xl font-serif text-[#F0F0FF] text-center">Our Sponsors</h2>
					<!-- Brush texture overlay for header -->
					<div
						class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
					></div>
				</div>

				<!-- Main Content Area -->
				<div class="relative bg-gradient-to-b from-[#CCF4FD] to-[#AECDF6] px-8 pt-8 pb-16">
					<!-- Brush texture overlay for content -->
					<div
						class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
					></div>

					<!-- Sponsors Grid -->
					<div class="relative z-10 min-h-40">
						{#if sponsors.length > 0}
							{#each tierOrder as tierKey}
								{@const sponsorList = data.sf_data.sponsors[tierKey]}
								{#if sponsorList && sponsorList.length > 0}
									<div class="w-full mb-12 last:mb-0">
										<h3 class="text-3xl font-bold font-serif text-[#335969] mb-8 text-center">
											{tierStyles[tierKey]?.name || tierKey}
										</h3>
										<div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
											{#each sponsorList as sponsor}
												<a
													href={sponsor.url}
													target="_blank"
													rel="noopener noreferrer"
													class="transition-transform hover:scale-105 block p-2 bg-white/20 rounded-lg hover:bg-white/40"
												>
													<img
														src={sponsor.image}
														alt="{sponsor.name} logo"
														class="object-contain {tierStyles[tierKey]?.class || 'h-20'} max-w-48"
													/>
												</a>
											{/each}
										</div>
									</div>
								{/if}
							{/each}
						{/if}
					</div>
				</div>

				<!-- Billboard Bars (bottom) -->
				<div
					class="absolute bottom-0 -left-[5px] w-[calc(100%+10px)] h-6 bg-[url('/billboard-bars.png')] bg-repeat-x bg-contain bg-center pointer-events-none z-10 border-[#9898a7] border-x-[6px]"
				></div>
			</div>

			<!-- Connecting Pillars to First Billboard -->
			<div
				class="absolute top-0 left-[15%] w-[10vw] max-w-12 h-32 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain -translate-y-32"
				style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
			></div>
			<div
				class="absolute top-0 right-[15%] w-[10vw] max-w-12 h-32 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain -translate-y-32"
				style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
			></div>

			<!-- Billboard Pillars (extending down from bottom) -->
			<div
				class="absolute bottom-0 left-[15%] w-[10vw] max-w-12 h-24 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain translate-y-24"
				style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
			>
				<div
					class="absolute bottom-0 left-0 w-full h-auto bg-[url('/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"
				></div>
			</div>
			<div
				class="absolute bottom-0 right-[15%] w-[10vw] max-w-12 h-24 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain translate-y-24"
				style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
			>
				<div
					class="absolute bottom-0 left-0 w-full h-auto bg-[url('/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"
				></div>
			</div>
		</div>
	</div>
{/if}

<div
	class="w-full pb-24 max-md:pt-16 bg-gradient-to-b from-[#FAE3C9] to-[#e99cce] relative flex flex-col items-center justify-center"
>
	<section class="max-w-4xl w-full mx-auto text-center text-[#8B4513] font-serif pt-16 px-4">
		<h2 class="text-5xl font-bold italic mb-12 relative">
			What will you dream?
			<img
				src="/underline.svg"
				alt=""
				class="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-auto opacity-70"
			/>
		</h2>
		<div class="text-xl leading-relaxed space-y-6">
			<p>
				With 24 hours of non-stop building, what will you dream up? A thrilling platformer, a
				heartfelt visual novel, or a quirky puzzle game? The canvas is blank, and the adventure is
				yours to create. Let your imagination run wild!
			</p>
		</div>
	</section>

	<img src="/faq-clouds.png" alt="" class="w-full pt-16" />
	<img src="/faq.png" alt="FAQ" class="mb-12 h-24 scale-175 max-md:scale-120" />

	<!-- FAQ Grid -->
	<div class="grid grid-cols-2 gap-8 max-w-6xl px-8 z-10 max-[900px]:grid-cols-1 max-md:gap-16">
		<!-- FAQ Item 1 -->
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
					All high-school & upper-middle-school aged students are welcome to come! <strong>You must be over 12 or under 19 to participate.</strong>
				</p>
			</div>
		</div>

		<!-- FAQ Item 2 -->
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

		<!-- FAQ Item 3 -->
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

		<!-- FAQ Item 4 -->
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

		<!-- FAQ Item 5 -->
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

		<!-- FAQ Item 6 -->
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

		<!-- FAQ Item 7 -->
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

		<!-- FAQ Item 8 -->
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
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
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

	<!-- Footer Text -->
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

<!-- Video Popup Modal -->
{#if showVideoPopup}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
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
		<!-- svelte-ignore a11y_no_static_element_interactions -->
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
