<script lang="ts">
	import { onMount } from "svelte";
	import { gsap } from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	
	// Event Configuration
	const eventName = "Daydream Atlanta";
	const eventLocation = "Atlanta";
	const eventAddress = "---";
	const directionsURL = "---"
	const scheduleData = {
    saturday: {
        title: "Saturday, September 27th",
        items: [
            { event: "Doors open", time: "11:00 AM" },
            { event: "Opening ceremony", time: "12:00 PM" },
            { event: "Lunch", time: "12:30 PM" },
            { event: "Start working on your project!", time: "1:00 PM" },
            { event: "Workshop 1", time: "2:00 PM" },
            { event: "Activity 1", time: "4:00 PM" },
            { event: "Workshop 2", time: "4:00 PM" },
            { event: "Dinner", time: "6:00 PM" },
            { event: "Lightning talks", time: "8:00 PM" },
            { event: "Midnight surprise", time: "12:00 AM" }
        ]
    },
    sunday: {
        title: "Sunday, September 28th",
        items: [
            { event: "Breakfast", time: "8:00 AM" },
            { event: "Demos!", time: "10:30 AM" },
            { event: "Closing ceremony", time: "12:00 PM" }
        ]
    }
};
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
Mumbai`.split("\n")

	function createSmoothPath(points: Array<{ x: number; y: number }>) {
		if (points.length < 2) return "";
		
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
	
	// Generate ticker text from cities array - constant for local event
	const tickerText = cities.join(" • ");

	// Particle system
	let particles: Array<{ id: number; x: number; y: number; opacity: number; rotation: number; velocityY: number; velocityX: number; scale: number }> = [];
	let particleIdCounter = 0;
	let particleContainer: HTMLElement;
	let isTabVisible = true;
	const particleSpeedScale = 0.6;

	function openVideoPopup() {
		console.log("HERE")
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
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email })
		}).catch(error => {
			console.warn('Failed to save email:', error);
		});
		
		window.open(`https://forms.hackclub.com/daydream?email=${encodeURIComponent(email)}`, '_blank');
		
		emailInput.value = '';
	}

	function setupPlaneAnimation() {
		const container = document.getElementById("islands-container");
		const airplane = document.getElementById("paper-airplane");
		
		if (!container || !airplane) return;
		
		// Create an object to animate progress
		const planeProgress = { value: 0 };
		
		// Get points for path calculation
		const getPoints = () => {
			const containerRect = container.getBoundingClientRect();
			const points: Array<{ x: number; y: number }> = [];
			const pointIds = ["0", "0.5", "1", "2", "3", "4", "5"];
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
					transformOrigin: "center center",
					transform: `translate(-50%, calc(-50% - 0.5rem))`
				});
			}
		};

		// Create animation timeline
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				start: "top 100%",
				end: "bottom 100%",
				scrub: 1.5,
				// markers: true,
			}
		});

		// Animate the progress value
		tl.to(planeProgress, {
			value: 1,
			duration: 1,
			ease: "none",
			onUpdate: updatePlanePosition
		});

		return tl;
	}

	function createParticle () {
		if (!particleContainer || !isTabVisible) return;
		
		const button = document.querySelector('a[href="https://forms.hackclub.com/daydream-stickers"]');
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
		const container = document.getElementById("islands-container");
		const pathElement = document.getElementById("dotted-path");
		
		if (!container || !pathElement) return;
		
		const containerRect = container.getBoundingClientRect();
		const points: Array<{ x: number; y: number }> = [];
		
		// Get points in order by data-point attribute
		const pointIds = ["0", "0.5", "1", "2", "3", "4", "5"];
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
		pathElement.setAttribute("d", pathData);
	}

	onMount(() => {
		
		// Register GSAP plugins
		gsap.registerPlugin(ScrollTrigger);
		
		// Setup parallax for cloudy background
		const cloudyBg = document.querySelector('.cloudy-bg-parallax');
		if (cloudyBg) {
			gsap.to(cloudyBg, {
				yPercent: 20,
				ease: "none",
				scrollTrigger: {
					trigger: cloudyBg,
					start: "bottom bottom",
					end: "bottom top",
					scrub: true
				}
			});
		}
		
		// Setup parallax for hero UI elements
		const heroUI = document.querySelector('.hero-ui-parallax');
		if (heroUI) {
			gsap.to(heroUI, {
				yPercent: 8,
				ease: "none",
				scrollTrigger: {
					trigger: heroUI,
					start: "bottom bottom",
					end: "bottom top",
					scrub: true
				}
			});
		}
		
		// Setup parallax for back buildings (slower movement)
		const backBuildings = document.querySelector('.buildings-back-parallax');
		if (backBuildings) {
			gsap.to(backBuildings, {
				yPercent: 20,
				ease: "none",
				scrollTrigger: {
					trigger: backBuildings,
					start: "bottom bottom",
					end: "bottom top",
					scrub: true
				}
			});
		}
		
		// Setup parallax for front buildings (faster movement)
		const frontBuildings = document.querySelector('.buildings-front-parallax');
		if (frontBuildings) {
			gsap.to(frontBuildings, {
				yPercent: 10,
				ease: "none",
				scrollTrigger: {
					trigger: frontBuildings,
					start: "top top",
					end: "bottom top",
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
		window.addEventListener("resize", handleResize);
		
		// Handle tab visibility changes
		document.addEventListener("visibilitychange", handleVisibilityChange);
		
		// Start particle animation
		animateParticles();
		
		// Start particle spawning
		const particleInterval = setInterval(createParticle, 250);
		
		// Cleanup
		return () => {
			window.removeEventListener("resize", handleResize);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			clearInterval(particleInterval);
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	});
</script>

<style>
	:global(body) {
		background-color: #CCF4FD;
		max-width: 100vw;
		overflow-x: hidden;	
	}
	:global(html) {
		overflow-x: hidden;
	}
</style>

<svelte:head>
	<title>Daydream</title>
</svelte:head>

<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>

<div class="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-[#CCF4FD] to-[#B8D9F8] bg-blend-overlay relative">
	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-30 pointer-events-none"></div>

	<!-- Cloudy Background -->
	<div class="cloudy-bg-parallax absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[80vh] bg-[url(/cloudy-bg.png)] opacity-30 bg-cover bg-no-repeat bg-top pointer-events-none"></div>

	<div class="buildings-back-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-back.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"></div>
	
	<!-- Animated text ticker along curvy line -->
	<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none lg:-translate-y-35 -translate-y-20 overflow-hidden max-md:w-200 max-lg:w-[125%]">
		<svg width="1280" height="464" viewBox="0 0 1280 464" class="w-full h-max pt-32 object-contain" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<path id="curvy-path" d="M-41 274.995C91.5 229.995 203.5 64.4946 483.5 39.9946C763.5 15.4946 892.5 151.495 1165 196.495C1383 232.495 1462.5 263.828 1475 274.995"/>
				<mask id="reveal-mask">
					<rect x="0" y="0" width="0" height="464" fill="white">
						<animate attributeName="width" values="0;1280" dur="2s" calcMode="spline" keySplines="0.05,0.7,0.3,1" keyTimes="0;1" begin="0.75s" fill="freeze"/>
					</rect>
				</mask>
			</defs>
			<g mask="url(#reveal-mask)">
				<!-- Background path stroke -->
				<path d="M-41 268.495C91.5 223.495 203.5 57.9946 483.5 33.4946C763.5 8.9946 892.5 144.995 1165 189.995C1383 225.995 1462.5 257.328 1475 268.495" 
					  stroke="#9EE4F2" stroke-width="28" fill="none" stroke-linecap="round"/>
				<text font-family="sans-serif" fill="#EDFCFF" font-weight="bold" font-size="18">
					<textPath href="#curvy-path" startOffset="-100%">
						{@html Array(2).fill(tickerText).join(" • ")} • 
						<animate id="ticker-animation" attributeName="startOffset" values="-100%;0%" dur="30s" repeatCount="indefinite"/>
					</textPath>
				</text>
			</g>
		</svg>
	</div>
	
	<!-- brush texture clipped to back buildings -->
	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat pointer-events-none opacity-100 lg:-translate-y-15 bg-center mix-blend-overlay" style="mask-image: url('/buildings-back.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center top; -webkit-mask-image: url('/buildings-back.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center top;"></div>
	
	<div class="buildings-front-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-front.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"></div>
	<!-- brush texture clipped to front buildings -->
	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat pointer-events-none opacity-100 lg:-translate-y-15 bg-center mix-blend-overlay" style="mask-image: url('/buildings-front.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center top; -webkit-mask-image: url('/buildings-front.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center top;"></div>
	<div class="hero-ui-parallax flex flex-col items-center justify-center text-center relative z-5 -translate-y-2">
		<div class="inline-block relative">
			<div class="h-12"></div> 
			<!-- space for the ship -->
			<h2
			class="text-xl font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent absolute left-1/2 max-sm:translate-y-4 max-sm:mb-0 max-md:-mb-8 md:left-[calc(50%+4rem)] -translate-x-1/2 bottom-8 italic w-max md:text-lg max-sm:text-lg"
			>
				September 27th & 28th, 2025
			</h2>
			<img src="daydream.png" alt="Daydream" class="h-40 mb-6 w-auto object-contain max-w-full px-4" />
			<a href="https://hackclub.com" class="absolute top-0 -right-6 max-sm:right-0 max-sm:scale-80 animate-hover ![animation-delay:0.9s] ![--hover:-0.2rem]">
				<img src="flag-plane.png" alt="Hack Club" class="h-28">
			</a>
		</div>
		<div class="relative inline-block px-4">
			<h3
				class="text-3xl italic font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent w-max max-sm:text-2xl mx-auto"
			>
				Game jam for high schoolers
			</h3>
			<img
				src="underline.svg"
				alt=""
				class="absolute left-1/2 -translate-x-1/2 -mt-1 h-auto scale-115"
			/>
			<h4
				class="text-2xl opacity-90 mt-2 font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent max-sm:text-xl"
			>
				Organized by teenagers in {EVENT_LOCATION}
			</h4>
		</div>
		
		<div class="mt-8 flex flex-col items-center gap-3 z-5 max-md:scale-90">
			<form on:submit={handleFormSubmit} class="rounded-full bg-white border-2 border-dark font-sans p-2 flex flex-row items-center gap-2 shadow-[0_3px_0_0_theme(colors.dark)] focus-within:border-pink focus-within:shadow-[0_3px_0_0_#E472AB] has-[button:active]:border-dark has-[button:active]:shadow-[0_3px_0_0_theme(colors.dark)] has-[button:focus]:border-dark has-[button:focus]:shadow-[0_3px_0_0_theme(colors.dark)]">
				<input
					type="email"
					name="email"
					placeholder="Enter email to sign up"
					class="w-80 px-3 py-1 text-dark focus:outline-none"
					required
				/>
				<input type="hidden" name="mailingLists" value="cmd3c94kz0hvz0iwt7ps28cyd" />
				<button type="submit" class="bg-light h-full px-5 rounded-full border-b-2 border-[#B3866A] cursor-pointer hover:border-b-4 hover:transform active:border-b-0 active:transform active:translate-y-0.5 focus:outline-none transition-all duration-100">
					<img src="submit.svg" alt="Go">
				</button>
			</form>
			<a
				href="https://forms.hackclub.com/daydream-stickers"
				target="_blank"
				class="w-max px-4 py-2 bg-pink border-b-2 border-b-pink-dark text-white rounded-full active:transform active:translate-y-0.5 transition-all duration-100 font-sans cursor-pointer mx-auto relative overflow-visible hover:shadow-[0_2px_0_0_theme(colors.pink.dark)] hover:-translate-y-[2px] active:border-transparent active:shadow-none active:"
			>
				Get free stickers
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
	</div>

	<!-- <img src="hot-air-balloon.png" alt="" class="absolute w-1/8 right-32 bottom-40 z-20"> -->
	<!-- <img src="hot-air-balloon.png" alt="" class="absolute w-1/12 left-36 bottom-81 z-20"> -->

	<!-- Particle container -->
	<div bind:this={particleContainer} class="absolute inset-0 pointer-events-none z-0 opacity-70">
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
	<div class="absolute left-5/12 -translate-x-1/2 w-7/12 -bottom-24 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full" style="mask-image: url('/clouds-top-middle-bg.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/clouds-top-middle-bg.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"></div>
	
	<img src="/clouds-top-right-bg.svg" alt="" class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2">
	<div class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full" style="mask-image: url('/clouds-top-right-bg.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/clouds-top-right-bg.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"></div>
	
	<img src="/clouds-top-left-bg.svg" alt="" class="absolute left-0 w-3/12 -bottom-12  translate-y-1/2">
	<div class="absolute left-0 w-3/12 -bottom-12 translate-y-1/2 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full" style="mask-image: url('/clouds-top-left-bg.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/clouds-top-left-bg.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"></div>
	
	<img src="/clouds-top-middle.png" alt="" class="absolute left-5/12 -translate-x-1/2 w-7/12 -bottom-24 z-20">
	<img src="/clouds-top-right.png" alt="" class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2 z-20">
	<img src="/clouds-top-left.png" alt="" class="absolute left-0 w-3/12 -bottom-12  translate-y-1/2 z-20">
	

	
	<!-- Video Thumbnail Button Container -->
	<div class="absolute bottom-8 right-8 max-sm:top-[calc(50%+22rem)] max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:bottom-auto max-sm:right-auto max-sm:scale-150 z-11000 [1750px]:scale-150 2xl:origin-bottom-right">
		<!-- Click Me Text -->
		<div class="absolute -top-8 -left-4 text-base font-sans text-[#8B4513] transform -rotate-12 pointer-events-none z-10 max-sm:top-full max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:rotate-0 max-sm:mt-1 max-sm:text-center max-sm:text-xs animate-hover max-sm:![--hover:-0.2rem]">
			click me!
		</div>
		
		<!-- Video Thumbnail Button -->
		<button
			on:click={openVideoPopup}
			class="w-40 h-24 rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group lg:w-72 lg:h-40 sm:w-40 sm:h-24 animate-hover max-sm:![--hover:-0.2rem]"
			style="box-shadow: 0 0 20px #905429"
		>
			<img src="thumbnail.png" alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
			<div class="absolute inset-0 bg-[rgba(0,0,0,0.1)] bg-opacity-30 group-hover:bg-opacity-20 transition-colors duration-300 flex items-center justify-center">
				<div class="scale-150 w-8 h-8 bg-[rgba(255,255,255,0.5)] bg-opacity-20 rounded-full flex items-center justify-center md:w-6 md:h-6 sm:w-4 sm:h-4">
					<div class="w-0 h-0 border-l-[8px] border-l-[rgba(255,255,255,1)] border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-1 md:border-l-[6px] md:border-t-[4px] md:border-b-[4px] sm:border-l-[4px] sm:border-t-[3px] sm:border-b-[3px]"></div>
				</div>
			</div>
		</button>
	</div>
</div>

<div class="w-full relative flex items-start justify-center">
	<!-- background -->
	<div class="absolute top-0 left-0 w-full h-full -z-50 bg-[#FCEFC5]"></div>
	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-30 pointer-events-none -z-40"></div>
	
	<div class="relative max-w-4xl mx-auto h-full flex items-start pt-24 max-sm:pt-40 px-8 max-sm:px-2">
		<div class="relative z-20 px-20 pt-20 pb-32 rounded-lg mb-0 max-sm:px-18" style="background-image: url('/letter-top.png'), linear-gradient(to bottom, #FCEFC5 100px, transparent 100px), url('/letter-loop.png'); background-size: 100% auto, 100% auto, 100% auto; background-repeat: no-repeat, no-repeat, repeat-y; background-position: top, top, top; background-attachment: local, local, local;">
			<div class="absolute bottom-0 left-0 w-full h-24 z-10 pointer-events-none bg-[url('/clouds-loop.png')] bg-repeat-x bg-bottom bg-contain"></div>
			<h2 class="text-5xl font-serif italic text-[#8B4513] mb-10 relative">
				Dear Hacker,
				<img src="/underline.svg" alt="" class="absolute left-0 -bottom-3 w-64 h-auto opacity-70">
			</h2>
			
			<div class="text-[#8B4513] font-serif text-xl leading-relaxed space-y-8">
				<p>
					Hackathons are <em class="italic font-bold">magical</em>. You've probably felt it before: staying up all night 
					with your friends, building something that actually works, finally meeting 
					everyone whose code you've admired. That rush when your code compiles at 3:00 am 
					and suddenly your wild idea becomes real.
				</p>
				
				<p class="font-bold text-2xl">
					Hack Club wants you to organize a hackathon.
				</p>
				
				<p>
					We want more hackers than ever from all over the world to have this life 
					changing experience, and we want your help in making that happen.
				</p>
				
				<p>
					Sign up to organize a Daydream event in your city! All of our hackathons are 
					teen-led. You do not need to have any previous experience, and Hack Club 
					will provide you with funding and coaching.
				</p>
				
				<p>
					Our goal is to get <span class="font-bold">4,000 Hack Clubbers</span> to make projects they're proud of 
					through Daydream, and we're giving out over <span class="font-bold">$120k in funding</span> to organizers 
					like you!
				</p>
				
				<p class="text-center font-bold text-2xl mt-10 text-[#2C3E50]">
					Check out our <a class="underline hover:text-pink" href="https://www.youtube.com/watch?v=hNYsNSY7Vz0">video!</a>
				</p>
			</div>
		</div>
	</div>

	<div class="w-full absolute z-30 max-h-64 bottom-0 max-xl:translate-y-1/4 max-lg:translate-y-1/2 pointer-events-none">	
		<img src="/cloud-cover-1.png" alt="" class="w-full h-full object-contain">
		<div class="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2" data-point="0"></div>
		<div class="absolute top-1/2 left-1/4 w-1 h-1 -translate-x-1/2 -translate-y-1/2" data-point="0.5"></div>
	</div>
	<div class="absolute -bottom-44 left-1/2 -translate-x-1/2 w-10/12 h-auto object-contain z-100 cursor-text flex flex-row max-md:flex-wrap items-center justify-center align-middle max-w-5xl">
		<img src="gamejam-1.png" alt="Here's How You Organize a" class="flex-shrink min-w-0 object-contain">
		<img src="gamejam-2.png" alt="Game Jam" class="flex-shrink min-w-0 object-contain">
	</div>
</div>
<div class="w-full h-64 bg-[#FCEFC5]"></div>

<div class="flex flex-row flex-wrap w-full h-auto bg-gradient-to-b from-[#FCEFC5] to-[#FEC1CF] px-36 max-md:px-8 pb-50 max-sm:pb-24 relative xl:pt-12 2xl:pt-48" id="islands-container">

	<img src="/clouds-left-2.png" alt="" class="absolute left-0 w-3/12 top-12">
	<img src="/clouds-left-3.png" alt="" class="absolute left-0 w-2/12 bottom-32">
	<img src="/clouds-right-2.png" alt="" class="absolute right-0 w-3/12 bottom-0">

	<!-- SVG Path Overlay -->
	<svg class="absolute inset-0 w-full h-full pointer-events-none z-0" id="path-svg">
		<path id="dotted-path" stroke="rgba(255,255,255,0.5)" stroke-width="3" fill="none" stroke-dasharray="8,8" opacity="0.7"></path>
	</svg>

	<img src="paper-airplane.png" alt="Paper airplane" class="h-16 absolute z-10" id="paper-airplane">

	<div class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full z-10">
		<div class="relative translate-y-8 max-md:translate-y-4 z-30">
			<img src="/letter-1-front.png" alt="" class="object-contain absolute -bottom-16 -left-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.7s] z-20">
			<img src="/letter-1-back.png" alt="" class="object-contain absolute -bottom-16 -left-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.7s] z-10">
			<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:1.7s] z-20" data-point="1">
				<img src="paper1.png" alt="" class="w-full h-full object-contain">
				<div class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
					<span class="font-sans text-[#E472AB] font-bold text-[1.3rem] mr-1">#1:</span> <a href="https://forms.hackclub.com/daydream" class="underline">Sign up</a> for Daydream {EVENT_NAME}
				</div>
			</div>
		</div>
		<img src="/island-1.png" alt="" class="w-72 h-72 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:0.8s] z-0">
	</div>

	<div class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full translate-y-24 max-md:translate-y-8 z-10">
		<div class="relative translate-y-24 max-md:translate-y-4 z-30">
			<img src="/letter-2-front.png" alt="" class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.1s] z-20">
			<img src="/letter-2-back.png" alt="" class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.1s] z-10">
			<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:0.3s] z-20" data-point="2">
				<img src="paper2.png" alt="" class="w-full h-full object-contain">
				<div class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
					<span class="font-sans text-[#639DEB] font-bold text-[1.3rem] mr-1">#2:</span> Find a team of other teenagers at the event
				</div>
			</div>
		</div>
		<img src="/island-3.png" alt="" class="w-86 h-86 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:1.2s] z-0">
	</div>
	<div class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full -translate-x-12 max-md:translate-x-0 max-md:translate-y-8 z-10">
		<div class="relative translate-y-8 max-md:translate-y-4 z-30">
			<img src="/letter-3-front.png" alt="" class="object-contain absolute -bottom-18 left-24 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.9s] z-20">
			<img src="/letter-3-back.png" alt="" class="object-contain absolute -bottom-18 left-24 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.9s] z-10">
			<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:1.4s] z-20" data-point="3">
				<img src="paper3.png" alt="" class="w-full h-full object-contain">
				<div class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
					<span class="font-sans text-[#AB68E2] font-bold text-[1.3rem] mr-1">#3:</span> Start building your game - <u>no experience needed</u>
				</div>
			</div>
		</div>
		<img src="/island-2.png" alt="" class="w-72 h-72 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:2.1s] z-0">
	</div>
		<div class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full translate-y-30 max-md:translate-y-8 z-10">
		<div class="relative translate-y-24 max-md:translate-y-4 z-30">
			<img src="/letter-4-front.png" alt="" class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.6s] z-20">
			<img src="/letter-4-back.png" alt="" class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.6s] z-10">
			<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:2.3s] z-20" data-point="4">
				<img src="paper4.png" alt="" class="w-full h-full object-contain">
				<div class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
					<span class="font-sans text-[#F2993E] font-bold text-[1.3rem] mr-1">#4:</span> Attend workshops or talk to one of our mentors for help
				</div>
			</div>
		</div>
		<img src="/island-4.png" alt="" class="w-88 h-88 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:0.5s] z-0">
	</div>

	<!-- Final Card -->
	<div class="flex flex-col items-center w-full basis-full translate-y-40 max-md:translate-y-12 z-20">
		<div class="relative">
			<div class="bg-[url('/card-final.png')] bg-contain bg-no-repeat bg-center text-2xl font-serif pt-24 px-8 w-128 h-96 text-center max-md:w-80 max-md:h-80 max-md:text-xl max-md:pt-16 animate-hover ![--hover:-0.15rem] ![animation-delay:1.9s]" data-point="5">
				<span class="font-sans text-[#F2CC32] font-bold text-[1.5rem] mr-1">#5:</span> Share what you made with the world
			</div>
		</div>
	</div>

	<img src="/clouds-pink-left.png" alt="" class="absolute left-0 w-5/12 bottom-0 translate-y-32 z-50 pointer-events-none">
	<img src="/clouds-pink-right.png" alt="" class="absolute right-0 w-5/12 bottom-0 translate-y-32 z-50 pointer-events-none">

	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none bg-position-[0_100vh]"></div>
</div>

<div class="w-full bg-gradient-to-b from-[#FDC5D1] to-[#FAE3C9] items-center justify-center px-32 relative pt-36">
	<div class="max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2 max-md:z-100 max-sm:pt-16">
		<div class="relative w-full max-w-3xl mx-auto min-w-72 max-md:mx-0">
			<div class="absolute top-0 left-1/2 -translate-x-1/2 max-md:-translate-y-1/2 max-sm:translate-y-[calc(-50%-4rem)] h-48 w-auto z-100 flex items-center justify-center px-4 pointer-events-none">
				<h2 class="text-4xl font-serif italic text-[#60574b] bg-white px-6 py-3 rounded-lg shadow-lg max-md:text-3xl max-sm:text-2xl text-center">
					{EVENT_LOCATION}
				</h2>
			</div>
			<img src="hole.png" alt="" class="w-full h-full max-w-3xl max-sm:scale-200 pointer-events-none">
			<div 
				class="absolute top-0 left-0 w-full h-full border-0 max-sm:scale-200 bg-blue-200 flex items-center justify-center text-[#60574b] font-bold text-xl"
				style="mask: url('hole.png') no-repeat center; -webkit-mask: url('hole.png') no-repeat center; mask-size: contain; -webkit-mask-size: contain;">
				Local Event
			</div>
			<p class="absolute left-1/2 -translate-x-1/2 font-sans text-center text-2xl pt-12 max-sm:pt-40 max-sm:text-xl w-max max-w-[80vh] max-md:max-w-full md:px-12 text-[#60574b] z-10000 ">All daydream events are organized by high school students like yourself! <br> <span class="font-bold"><a class="underline hover:text-pink" href="https://forms.hackclub.com/daydream">Sign up</a> to organize now!</span></p>
		</div>
	</div>
	<div class="max-md:h-136"></div>
	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
</div>

<div class="w-full pb-24 max-md:pt-16 bg-gradient-to-b from-[#FAE3C9] to-[#e99cce] relative flex flex-col items-center justify-center">
	<img src="faq-clouds.png" alt="" class="w-full">
	<img src="faq.png" alt="FAQ" class="mb-12 h-24 scale-175 max-md:scale-120">

	<!-- FAQ Grid -->
	<div class="grid grid-cols-2 gap-8 max-w-6xl px-8 z-10 max-[900px]:grid-cols-1 max-md:gap-16">
		<!-- FAQ Item 1 -->
		<div class="relative transform -rotate-2">
			<img src="window-3.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">Who can participate in Daydream?</h3>
				<p class="text-sm">All high-school & upper-middle-school aged students are welcome to come!</p>
		</div>
		</div>

		<!-- FAQ Item 2 -->
		<div class="relative transform rotate-1">
			<img src="window-4.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">Can I organize a Daydream in my city?</h3>
				<p class="text-sm">Definitely! Contact us via daydream@hackclub.com or join #daydream on slack.</p>
			</div>
		</div>

		<!-- FAQ Item 3 -->
		<div class="relative transform rotate-2">
			<img src="window-2.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24  opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">All this, for free?</h3>
				<p class="text-sm">Yep! Food, swag and good vibes are all included. Plus, if you're joining us from afar, we'll cover the cost of gas or a bus / train ticket.</p>
			</div>
		</div>

		<!-- FAQ Item 4 -->
		<div class="relative transform -rotate-1">
			<img src="window-1.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24  opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">What do I need?</h3>
				<p class="text-sm">Your laptop, chargers, toiletries, sleeping bags, and an open mind!</p>
			</div>
		</div>

		<!-- FAQ Item 5 -->
		<div class="relative transform rotate-1">
			<img src="window-4.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-1 max-md:text-base">What has Hack Club done before?</h3>
				<p class="text-sm">Hack Club has run a hackathon in at GitHub HQ, a Game Jam in 50 cities, a hackathon on a train from Vermont to Los Angeles, and more!</p>
			</div>
		</div>

		<!-- FAQ Item 6 -->
		<div class="relative transform rotate-1">
			<img src="window-3.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">I'm not good at coding. Can I still participate?</h3>
				<p class="text-sm">This game jam is for all skill levels! We'll have workshops and other events so join us and let's learn together.</p>
			</div>
		</div>

		<!-- FAQ Item 7 -->
		<div class="relative transform -rotate-2">
			<img src="window-2.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">What if my parents are concerned?</h3>
				<p class="text-sm">We're here to help! You can see our parent guide here, or they can reach out to us at daydream@hackclub.com for questions.</p>
			</div>
		</div>

		<!-- FAQ Item 8 -->
		<div class="relative transform -rotate-1">
			<img src="window-1.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">What can I make at Daydream?</h3>
				<p class="text-sm">ANY type of game based on the theme! Platformer, visual novel, clicker game, etc. Be as creative as possible!</p>
			</div>
		</div>
	</div>

	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
</div>

<div class="w-full bg-[#FFFFF8] relative min-h-80">
	<div class="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] bg-repeat opacity-10 pointer-events-none z-0"></div>
	<div class="opacity-60 absolute w-full h-32 bg-[url('brushstroking.png')] bg-repeat-x z-10 bg-size-[100vw_100vh] mix-blend-overlay" style="mask-image: url(/footer-clouds.png); mask-size: contain; mask-repeat: repeat-x; -webkit-mask-image: url(/footer-clouds.png); -webkit-mask-size: contain; -webkit-mask-repeat: repeat-x;"></div>
	<div class="w-full h-32 bg-[#e99cce] z-5" style="mask-image: url(/footer-clouds.png); mask-size: contain; mask-repeat: repeat-x; -webkit-mask-image: url(/footer-clouds.png); -webkit-mask-size: contain; -webkit-mask-repeat: repeat-x;"></div>

	<!-- Footer Text -->
	<div class="absolute bottom-20 left-32 text-center z-20 max-md:bottom-12 max-md:left-8 max-md:right-4 max-md:text-left">
		<p class="text-gray-700 mb-2">Made with ♡ by teenagers, for teenagers at Hack Club</p>
		<div class="flex space-x-4 max-md:flex-col max-md:space-x-0 max-md:space-y-2">
			<a href="https://hackclub.com" class="underline text-gray-700 hover:text-gray-900 transition-colors ">Hack Club</a>
			<span class="text-gray-700 max-md:hidden">・</span>
			<a href="https://hackclub.com/slack" class="underline text-gray-700 hover:text-gray-900 transition-colors ">Slack</a>
			<span class="text-gray-700 max-md:hidden">・</span>
			<a href="https://hackclub.com/clubs" class="underline text-gray-700 hover:text-gray-900 transition-colors ">Clubs</a>
			<span class="text-gray-700 max-md:hidden">・</span>
			<a href="https://hackclub.com/hackathons" class="underline text-gray-700 hover:text-gray-900 transition-colors ">Hackathons</a>
		</div>
	</div>

	<div class="max-sm:hidden absolute bottom-2 right-16 h-2/3 aspect-square bg-[url('brushstroking.png')] bg-repeat z-10 bg-size-[100vw_100vh] mix-blend-overlay" style="mask-image: url(/thought-bubbles.png); mask-size: contain; mask-repeat: no-repeat; -webkit-mask-image: url(/thought-bubbles.png); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat;"></div>
	<div class="max-sm:hidden absolute bottom-2 right-16 h-2/3 aspect-square bg-[#e99cce]" style="mask-image: url(/thought-bubbles.png); mask-size: contain; mask-repeat: no-repeat; -webkit-mask-image: url(/thought-bubbles.png); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat;"></div>
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

