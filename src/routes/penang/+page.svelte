<script lang="ts">
	const eventName = "Penang";
	const eventLocation = "Penang";
	const eventAddress = "Wisma Yeap Chor Ee, 37, Gat Lebuh China, Georgetown, 10200 George Town, Penang";
	const directionsURL = "https://www.google.com/maps/place/PSC@Heritage+(Penang+Science+Cluster)/@5.4153623,100.3397381,17z/data=!3m1!4b1!4m6!3m5!1s0x304ac38e9e1ad7e9:0xdb5c3a2cdee5013c!8m2!3d5.415357!4d100.342313!16s%2Fg%2F11clvx6mkl?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D"
	const contactLink = "mailto:penang@daydream.hackclub.com"
	
	const signupLink = "https://forms.hackclub.com/daydream-sign-up?event=recv7MKnWKwmBZC48";
	const sponsorsEnabled = true; 
	const sponsors = [
		{ image: "https://storage.jukeboxprint.com/s/images/jukebox-logo.svg", name: "Jukebox", url: "https://www.jukeboxprint.com/custom-stickers" },
		{ image: "/penang/cytron.png", name: "Cytron Technologies", url: "https://cytron.io" }
	];
	
	const scheduleData: { title: string; items: { event: string; time: string; }[] }[] = [
		{
			title: "Saturday, September 27th",
			items: [
				{ event: "Doors open", time: "9:00 AM" },
				{ event: "Opening ceremony", time: "10:00 AM" },
				{ event: "Workshop 1", time: "10:30 AM" },
				{ event: "Project kickoff", time: "11:30 AM" },
				{ event: "Workshop 2", time: "12:00 PM" },
				{ event: "Lunch", time: "1:00 PM" },
				{ event: "Workshop 3", time: "2:00 PM" },
				{ event: "Final project push", time: "3:00 PM" },
				{ event: "Ship the project", time: "4:30 PM" },
				{ event: "Project demo & closing ceremony", time: "5:00 PM" }
			]
		}
	];

	
	import { onMount } from "svelte";
	import { gsap } from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import ParticipantSignUp from "$lib/components/ParticipantSignUp.svelte";
	import { page } from '$app/stores';
	
	
	/** @type {import('./$types').PageData} */
	export let data;
	
	$: currentUrl = `https://daydream.hackclub.com${$page.url.pathname}`;
	$: pageTitle = `${eventName} - Game Jam in ${eventLocation}`;
	$: pageDescription = `Join Daydream ${eventName} in ${eventLocation}! A teen-led game jam where you'll build amazing games with other high schoolers. Food, workshops, and prizes included!`;
	$: pageKeywords = `game jam, hackathon, teen coding, Hack Club, game development, ${eventLocation}, ${eventName}`;

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
Kuala Lumpur
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
	
	// Dice functionality state
	let showDice = false;
	let diceNumbers = [1, 1, 1]; // Default dice values
	let showDone = false;
	let isRolling = false;
	let ideaText = "";
	let isTyping = false;
	
	// Generate ticker text from cities array (constant)
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



	async function typeText(text: string) {
		isTyping = true;
		ideaText = "";
		
		for (let i = 0; i <= text.length; i++) {
			ideaText = text.slice(0, i);
			await new Promise(resolve => setTimeout(resolve, 20));
		}
		
		isTyping = false;
	}

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
						return "How about a game where you collect magical crystals to save a mysterious floating world?";
					}
				}
				
				const data = await response.json();
				return data.idea;
			} catch (error) {
				attempt++;
				console.warn(`Attempt ${attempt} failed:`, error);
				
				if (attempt >= maxAttempts) {
					return "How about a game where you collect magical crystals to save a mysterious floating world?";
				}
				
				// Wait before retrying
				await new Promise(resolve => setTimeout(resolve, 1000));
			}
		}
		
		return "How about a game where you collect magical crystals to save a mysterious floating world?";
	}

	async function dreamIdea() {
		if (isRolling) return;
		
		isRolling = true;
		showDone = false;
		showDice = true;
		ideaText = "";
		
		const startTime = Date.now();
		const minDuration = 1000;
		let fetchComplete = false;
		let fetchResult: string = "";
		
		// Start fetch and dice animation concurrently
		const fetchPromise = fetchIdea().then(result => {
			fetchResult = result;
			fetchComplete = true;
			return result;
		});
		
		// Dice animation loop
		const dicePromise = (async () => {
			while (true) {
				const elapsed = Date.now() - startTime;
				
				// Stop if both minimum time has passed AND fetch is complete
				if (elapsed >= minDuration && fetchComplete) {
					break;
				}
				
				diceNumbers = [
					Math.floor(Math.random() * 6) + 1,
					Math.floor(Math.random() * 6) + 1,
					Math.floor(Math.random() * 6) + 1
				];
				
				await new Promise(resolve => setTimeout(resolve, 100));
			}
		})();
		
		// Wait for both to complete
		await Promise.all([fetchPromise, dicePromise]);
		
		showDone = false;
		showDice = false;
		isRolling = false;
		
		// Start typing animation with the fetched idea
		await typeText(fetchResult);
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
		console.log('User city:', data.userCity);
		
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
	
	/* Minimal scrollbar styling */
	.idea-output-box::-webkit-scrollbar {
		width: 8px;
	}
	
	.idea-output-box::-webkit-scrollbar-track {
		background: transparent;
	}
	
	.idea-output-box::-webkit-scrollbar-thumb {
		background-color: #d1e3ee;
		border-radius: 0;
		border: none;
	}
	
	.idea-output-box::-webkit-scrollbar-thumb:hover {
		background-color: #d1e3ee;
	}
	
	.idea-output-box::-webkit-scrollbar-corner {
		background: transparent;
	}
	
	/* Firefox scrollbar styling */
	.idea-output-box {
		scrollbar-width: auto;
		scrollbar-color: #d1e3ee transparent;
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
				September 27th 2025
			</h2>
			<img src="./penang/daydream.svg" alt="Daydream" class="h-40 mb-6 w-auto object-contain max-w-full px-4" />
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
			<h3 class="text-3xl italic font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent w-max max-sm:text-xl mx-auto">Free of charge</h3>
			<img
				src="underline.svg"
				alt=""
				class="absolute left-1/2 -translate-x-1/2 -mt-1 h-auto scale-115"
			/>
			<h4
				class="text-2xl opacity-90 mt-2 font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent max-sm:text-xl"
			>
				Organized by Teenagers in {@html eventLocation.replaceAll(" ", "&nbsp;")}
			</h4>
		</div>
		
		<ParticipantSignUp {signupLink} {eventName} />
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
	<div class="absolute left-5/12 -translate-x-1/2 w-7/12 -bottom-24 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full" style="mask-image: url('/clouds-top-middle-bg.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/clouds-top-middle-bg.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"></div>
	
	<img src="/clouds-top-right-bg.svg" alt="" class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2">
	<div class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full" style="mask-image: url('/clouds-top-right-bg.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/clouds-top-right-bg.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"></div>
	
	<img src="/clouds-top-left-bg.svg" alt="" class="absolute left-0 w-3/12 -bottom-12  translate-y-1/2">
	<div class="absolute left-0 w-3/12 -bottom-12 translate-y-1/2 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none h-full" style="mask-image: url('/clouds-top-left-bg.svg'); mask-size: contain; mask-repeat: no-repeat; mask-position: center; -webkit-mask-image: url('/clouds-top-left-bg.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;"></div>
	
	<img src="/clouds-top-middle.png" alt="" class="absolute left-5/12 -translate-x-1/2 w-7/12 -bottom-24 z-20 pointer-events-none">
	<img src="/clouds-top-right.png" alt="" class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2 z-20 pointer-events-none">
	<img src="/clouds-top-left.png" alt="" class="absolute left-0 w-3/12 -bottom-12  translate-y-1/2 z-20 pointer-events-none">
	

	<!-- Desktop stickers button (bottom left) -->
	<a
		href="https://forms.hackclub.com/daydream-stickers"
		target="_blank"
		class="hidden md:block absolute bottom-16 left-16 z-50 w-max px-4 py-2 bg-pink border-b-2 border-b-pink-dark text-white rounded-full active:transform active:translate-y-0.5 transition-all duration-100 font-sans cursor-pointer overflow-visible hover:shadow-[0_2px_0_0_theme(colors.pink.dark)] hover:-translate-y-[2px] active:border-transparent active:shadow-none"
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

<div class="w-full relative flex items-start justify-center">
	<!-- background -->
	<div class="absolute top-0 left-0 w-full h-full -z-50 bg-[#FCEFC5]"></div>
	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-30 pointer-events-none -z-40"></div>
	
	<div class="relative max-w-4xl mx-auto h-full flex items-start pt-24 max-sm:pt-40 px-8 max-sm:px-2">
		<div class="relative z-20 px-20 pt-20 pb-52 rounded-lg mb-0 max-sm:px-18" style="background-image: url('/letter-top.png'), linear-gradient(to bottom, #FCEFC5 100px, transparent 100px), url('/letter-loop.png'); background-size: 100% auto, 100% auto, 100% auto; background-repeat: no-repeat, no-repeat, repeat-y; background-position: top, top, top; background-attachment: local, local, local;">
			<div class="absolute bottom-0 left-0 w-full h-24 z-10 pointer-events-none bg-[url('/clouds-loop.png')] bg-repeat-x bg-bottom bg-contain"></div>
			<h2 class="text-5xl font-serif italic text-[#8B4513] mb-10 relative">
				Dear Hackers, Musicians, and Artists,
				<img src="/underline.svg" alt="" class="absolute left-0 -bottom-3 w-64 h-auto opacity-70">
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

	<div class="w-full absolute z-30 max-h-64 bottom-0 max-2xl:translate-y-1/4 max-lg:translate-y-1/2 pointer-events-none">	
		<img src="/cloud-cover-1.png" alt="" class="w-full h-full object-contain min-[2048px]:hidden">
	</div>

</div>

<!-- Schedule Container -->
<div class="w-full bg-[#FCEFC5] py-16 px-8 flex justify-center">
	<div class="relative max-w-4xl w-full">
		<!-- Billboard Container -->
		<div class="relative bg-[#f0f9ff] border-[10px] border-b-[16px] border-[#888896] rounded-lg rounded-b-xl mx-auto z-40">
			<!-- Billboard Lights (top) -->
			<img 
				src="/billboard-lights.png" 
				alt="" 
				class="absolute top-0 left-0 w-full h-auto object-contain pointer-events-none z-10 -translate-y-[calc(100%+9px)]"
			>
			
			<!-- Header Section -->
			<div class="w-full bg-[url('/billboard-bg-texture.png')] bg-contain bg-repeat py-6 relative" style="border-bottom: 8px solid #B4B4C5;">
				<h2 class="text-4xl font-serif text-[#F0F0FF] text-center">
					Schedule
				</h2>
				<!-- Brush texture overlay for header -->
				<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
			</div>
			
			<!-- Main Content Area -->
			<div class="relative bg-gradient-to-b from-[#CCF4FD] to-[#AECDF6] px-8 pt-8 pb-16">
				<!-- Brush texture overlay for content -->
				<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
				
				<!-- Schedule Content -->
				<div class="relative z-10">
					{#each scheduleData as day, dayIndex}
						<div class="bg-white/50 py-6 -mx-8 {dayIndex < scheduleData.length - 1 ? 'mb-8' : ''}">
							<h3 class="text-2xl font-sans font-bold text-[#335969] mb-6 text-center px-8 max-sm:text-xl max-sm:px-4">
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
			<div class="absolute bottom-0 left-0 w-full h-auto bg-[url('/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"></div>
		</div>
		<div 
			class="absolute top-1/2 right-[15%] w-[10vw] max-w-12 -bottom-12 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain"
			style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
		>
			<div class="absolute bottom-0 left-0 w-full h-auto bg-[url('/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"></div>
		</div>
	</div>
</div>

{#if sponsorsEnabled}
<!-- Second Billboard Section -->
<div class="w-full bg-[#FCEFC5] pb-16 pt-6 px-8 flex justify-center">
	<div class="relative max-w-4xl w-full">
		<!-- Billboard Container -->
		<div class="relative bg-[#f0f9ff] border-[10px] border-b-[16px] border-[#888896] rounded-lg rounded-b-xl mx-auto z-40">
			<!-- Header Section -->
			<div class="w-full bg-[url('/billboard-bg-texture.png')] bg-contain bg-repeat py-6 relative" style="border-bottom: 8px solid #B4B4C5;">
				<h2 class="text-4xl font-serif text-[#F0F0FF] text-center">
					Sponsors
				</h2>
				<!-- Brush texture overlay for header -->
				<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
			</div>
			
			<!-- Main Content Area -->
			<div class="relative bg-gradient-to-b from-[#CCF4FD] to-[#AECDF6] px-8 pt-8 pb-16">
				<!-- Brush texture overlay for content -->
				<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
				
				<!-- Sponsors Grid -->
				<div class="relative z-10 min-h-40">
					{#if sponsors.length > 0}
						<!-- First row (up to 4 sponsors) -->
						{#if sponsors.length > 4}
							<div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-8">
								{#each sponsors.slice(0, 4) as sponsor}
									<a href={sponsor.url} class="bg-white/20 rounded-lg p-4 w-full h-20 flex items-center justify-center hover:bg-white/40 transition-colors" target="_blank" rel="noopener noreferrer">
										<img src={sponsor.image} alt={sponsor.name} class="max-w-full max-h-full object-contain">
									</a>
								{/each}
							</div>
							
							<!-- Second row (remaining sponsors, centered) -->
							{#if sponsors.length > 4}
								<div class="flex justify-center">
									<div class="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center max-w-2xl">
										{#each sponsors.slice(4) as sponsor, index}
											<a href={sponsor.url} 
												class="bg-white/20 rounded-lg p-4 w-full h-20 flex items-center justify-center hover:bg-white/40 transition-colors {sponsors.slice(4).length === 3 && index === 2 ? 'md:col-span-1 col-span-2 max-w-xs mx-auto' : ''}" 
												target="_blank" rel="noopener noreferrer">
												<img src={sponsor.image} alt={sponsor.name} class="max-w-full max-h-full object-contain">
											</a>
										{/each}
									</div>
								</div>
							{/if}
						{:else}
							<!-- Single row for 4 or fewer sponsors -->
							<div class="flex justify-center">
								<div class="grid gap-8 w-full items-center justify-items-center max-w-4xl {sponsors.length === 1 ? 'grid-cols-1' : sponsors.length === 2 ? 'grid-cols-1 md:grid-cols-2' : sponsors.length === 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}">
									{#each sponsors as sponsor}
										<a href={sponsor.url} class="bg-white/20 rounded-lg p-4 w-full h-20 flex items-center justify-center hover:bg-white/40 transition-colors" target="_blank" rel="noopener noreferrer">
											<img src={sponsor.image} alt={sponsor.name} class="max-w-full max-h-full object-contain">
										</a>
									{/each}
								</div>
							</div>
						{/if}
					{/if}
					
					{#if contactLink}
						<!-- Call to action for sponsors -->
						<div class="mt-8 text-center">
							<p class="text-lg text-[#335969]"><a href="https://www.jukeboxprint.com/custom-stickers">Custom stickers</a> provided by Jukebox <br> Want to sponsor Daydream {eventName}? <a href={contactLink} class="underline hover:text-[#477783] transition-colors">Get in touch</a></p>
						</div>
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
			<div class="absolute bottom-0 left-0 w-full h-auto bg-[url('/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"></div>
		</div>
		<div 
			class="absolute bottom-0 right-[15%] w-[10vw] max-w-12 h-24 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain translate-y-24"
			style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
		>
			<div class="absolute bottom-0 left-0 w-full h-auto bg-[url('/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"></div>
		</div>
	</div>
</div>
{/if}

<!-- Gamejam Text Section -->
<div class="w-full bg-[#FCEFC5] flex justify-center py-16 relative overflow-hidden max-h-[400px]">
	<!-- Cloud backdrop for gamejam text -->
	<div class="absolute inset-0 w-full h-full pointer-events-none z-1">	
		<img src="/cloud-cover-1.png" alt="" class="w-full h-full object-cover">
				<div class="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2" data-point="0"></div>
		<div class="absolute top-1/2 left-1/4 w-1 h-1 -translate-x-1/2 -translate-y-1/2" data-point="0.5"></div>
	</div>
	
	<div class="relative w-10/12 h-auto object-contain cursor-text flex flex-row max-lg:flex-wrap md:translate-y-0 max-lg:translate-y-1/5 items-center justify-center align-middle max-w-5xl z-50">
		<img src="gamejam-1-alt.png" alt="Here's How You Win a" class="flex-shrink min-w-0 object-contain">
		<img src="gamejam-2.png" alt="Game Jam" class="flex-shrink min-w-0 object-contain">
	</div>
</div>

<div class="flex flex-row flex-wrap w-full h-auto bg-gradient-to-b from-[#FCEFC5] to-[#FEC1CF] px-36 max-md:px-8 pb-50 max-sm:pb-24 relative" id="islands-container">

	<img src="/clouds-left-2.png" alt="" class="absolute left-0 w-3/12 top-12 pointer-events-none">
	<img src="/clouds-left-3.png" alt="" class="absolute left-0 w-2/12 bottom-32 pointer-events-none">
	<img src="/clouds-right-2.png" alt="" class="absolute right-0 w-3/12 bottom-0 pointer-events-none">

	<!-- SVG Path Overlay -->
	<svg class="absolute inset-0 w-full h-full pointer-events-none z-0" id="path-svg">
		<path id="dotted-path" stroke="rgba(255,255,255,0.5)" stroke-width="3" fill="none" stroke-dasharray="8,8" opacity="0.7"></path>
	</svg>

	<img src="paper-airplane.png" alt="Paper airplane" class="h-16 absolute" id="paper-airplane">

	<div class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full z-10">
		<div class="relative translate-y-8 max-md:translate-y-4 z-30">
			<img src="/letter-1-front.png" alt="" class="object-contain absolute -bottom-16 -left-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.7s] z-20">
			<img src="/letter-1-back.png" alt="" class="object-contain absolute -bottom-16 -left-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.7s] z-10">
			<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:1.7s] z-20" data-point="1">
				<img src="paper1.png" alt="" class="w-full h-full object-contain">
				<div class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
					<span class="font-sans text-[#E472AB] font-bold text-[1.3rem] mr-1">#1:</span> <a href={signupLink} class="underline">Sign up</a> for Daydream {eventName}
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
					<span class="font-sans text-[#639DEB] font-bold text-[1.3rem] mr-1">#2:</span> Attend a workshop and learn about game development
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
					<span class="font-sans text-[#AB68E2] font-bold text-[1.3rem] mr-1">#3:</span> Find a team of other teenagers at the event
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
					<span class="font-sans text-[#F2993E] font-bold text-[1.3rem] mr-1">#4:</span> Start building your game - <em>no experience needed</em>
				</div>
			</div>
		</div>
		<img src="/island-4.png" alt="" class="w-88 h-88 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:0.5s] z-0">
	</div>

	<!-- Final Card -->
	<div class="flex flex-col items-center w-full basis-full translate-y-40 max-md:translate-y-12 z-20">
		<div class="relative">
			<div class="bg-[url('/card-final.png')] bg-contain bg-no-repeat bg-center text-2xl font-serif pt-24 px-8 w-128 h-96 text-center max-md:w-80 max-md:h-80 max-md:text-xl max-md:pt-16 animate-hover ![--hover:-0.15rem] ![animation-delay:1.9s]" data-point="5">
				<span class="font-sans text-[#F2CC32] font-bold text-[1.5rem] mr-1">#5:</span> Share what you made with the world!
			</div>
		</div>
	</div>

	<img src="/clouds-pink-left.png" alt="" class="absolute left-0 w-5/12 bottom-0 translate-y-32 z-50 pointer-events-none">
	<img src="/clouds-pink-right.png" alt="" class="absolute right-0 w-5/12 bottom-0 translate-y-32 z-50 pointer-events-none">

	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none bg-position-[0_100vh]"></div>
</div>

<div class="w-full bg-gradient-to-b from-[#FDC5D1] to-[#FAE3C9] items-center justify-center px-0 md:px-8 relative pt-36">
	<div class="w-full max-w-5xl lg:max-w-6xl mx-auto px-2 md:px-8">
		<div class="relative w-full min-w-72">
			<img src="banner-city.png" alt="Find a Daydream Near You" class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 md:-translate-y-[40%] h-48 w-auto z-100 scale-[1.15] md:scale-[1.65] saturate-70 brightness-110 object-contain px-4 pointer-events-none">
			
			<!-- Map container with cloudy edges -->
			<div class="relative w-full h-156 overflow-hidden bg-transparent">
				<iframe 
					src={eventAddress ? "/event-map?location=" + encodeURIComponent(eventAddress) : "/map"}
					class="w-full h-full border-0 bg-[#acd4e0]"
					style="
						mask-image: 
							linear-gradient(white, white),
							url('/clouds-loop-mask-2.png'),
							url('/clouds-loop-mask-1.png'),
							url('/clouds-loop-mask-3.png'),
							url('/clouds-loop-mask-4.png'),
							url('/cloud-corner-1.png'),
							url('/cloud-corner-2.png'),
							url('/cloud-corner-3.png'),
							url('/cloud-corner-4.png');
						mask-position: 
							center,
							top left,
							bottom left,
							left top,
							right top,
							bottom left,
							top left,
							top right,
							bottom right;
						mask-size: 
							auto auto,
							auto 72px,
							auto 72px,
							72px auto,
							72px auto,
							100px 100px,
							100px 100px,
							100px 100px,
							100px 100px;
						mask-repeat: 
							no-repeat,
							repeat-x,
							repeat-x,
							repeat-y,
							repeat-y,
							no-repeat,
							no-repeat,
							no-repeat,
							no-repeat;
						-webkit-mask-image: 
							linear-gradient(white, white),
							url('/clouds-loop-mask-2.png'),
							url('/clouds-loop-mask-1.png'),
							url('/clouds-loop-mask-3.png'),
							url('/clouds-loop-mask-4.png'),
							url('/cloud-corner-1.png'),
							url('/cloud-corner-2.png'),
							url('/cloud-corner-3.png'),
							url('/cloud-corner-4.png');
						-webkit-mask-position: 
							center,
							top left,
							bottom left,
							left top,
							right top,
							bottom left,
							top left,
							top right,
							bottom right;
						-webkit-mask-size: 
							auto auto,
							auto 72px,
							auto 72px,
							72px auto,
							72px auto,
							100px 100px,
							100px 100px,
							100px 100px,
							100px 100px;
						-webkit-mask-repeat: 
							no-repeat,
							repeat-x,
							repeat-x,
							repeat-y,
							repeat-y,
							no-repeat,
							no-repeat,
							no-repeat,
							no-repeat;
						mask-type: luminance;
						mask-mode: luminance;
						mask-composite: exclude, add, add, add, add, add, add, add, add;
					"
					title="Daydream Events Map">
				</iframe>
			</div>
			
			{#if eventAddress}
				<p class="text-center font-sans text-2xl pt-12 max-sm:text-xl text-[#60574b] z-10000">
					{#if directionsURL}
						Daydream {eventName} is taking place at <a class="underline text-pink" href={directionsURL}>{eventAddress}</a>!
					{:else}
						Daydream {eventName} is taking place at <span class="underline">{eventAddress}</span>!
					{/if}
				</p>
			{/if}
		</div>
	</div>

	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
	
	<!-- Macintosh Section -->
	<div class="w-full flex justify-center py-16 px-8 mt-48 pb-[clamp(232px,29vw,464px)] max-sm:w-[120vw] max-sm:-translate-x-[10vw]">
		<div class="bg-[#c5c2b1] p-4 relative max-w-4xl" style="border-radius: calc(1.5rem + 1rem);">
			<div class="bg-[#061E2D] text-[#D1E3EE] rounded-3xl py-18 md:py-16 px-10 md:px-18 relative overflow-visible" style="
			border-image: url('/macintosh.png') 128 91 464 91; 
			border-image-slice: 128 91 464 91; 
			border-image-width: clamp(64px, 8vw, 128px) clamp(45px, 6vw, 91px) clamp(232px, 29vw, 464px) clamp(45px, 6vw, 91px); 
			border-image-outset: clamp(64px, 8vw, 128px) clamp(45px, 6vw, 91px) clamp(232px, 29vw, 464px) clamp(45px, 6vw, 91px); 
			border-image-repeat: stretch; 
			border-style: solid;
		">
			<!-- frame around content -->
			<div class="absolute inset-0 bg-[url(/macintosh-frame.png)] bg-size-[100%_100%]"></div>

			<!-- Hack Club logo on border -->
			<img 
				src="/macintosh-hc-logo.png" 
				alt="Hack Club logo" 
				class="absolute w-12 h-12 pointer-events-none z-20" 
				style="
					bottom: calc(-1 * clamp(232px, 29vw, 464px) + 8rem);
					left: 5%;
				"
			>
			
			<!-- Brushstroke overlay on border -->
			<div 
				class="absolute pointer-events-none z-25" 
				style="
					top: calc(-1 * clamp(64px, 8vw, 128px));
					left: calc(-1 * clamp(45px, 6vw, 91px));
					right: calc(-1 * clamp(45px, 6vw, 91px));
					bottom: calc(-1 * clamp(232px, 29vw, 464px));
					background-image: url('/brushstroking.png');
					background-size: 100vw 100vh;
					background-repeat: repeat;
					mix-blend-mode: overlay;
					opacity: 0.4;
				"
			></div>
			
			<!-- Keyboard image -->
			<img 
				src="/macintosh-keyboard.png" 
				alt="Macintosh keyboard" 
				class="absolute pointer-events-none z-30 max-sm:!w-[250%]" 
				style="
					bottom: calc(-1 * clamp(232px, 29vw, 464px) - 10px - clamp(0px, 14vw, 180px));
					left: 50%;
					transform: translateX(-50%);
					width: 175%;
					max-width: none;
				"
			>
			
			<!-- Scanlines effect -->
			<div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent bg-[length:100%_6px] bg-repeat-y pointer-events-none opacity-30"></div>
			
			<!-- Rounded container -->
				<!-- Scanlines inside container -->
				<div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent bg-[length:100%_8px] bg-repeat-y pointer-events-none opacity-20"></div>
				
				<div class="space-y-8 max-sm:space-y-4 relative z-10">
					<h2 class="text-5xl md:text-6xl lg:text-7xl font-pixel leading-tight">
						What will you <img src="/dream-pixel.png" alt="Dream?" class="h-[0.75em] font-serif italic [image-rendering:pixelated] inline align-middle -translate-y-1.5">
					</h2>
					
					<p class="text-xl md:text-2xl opacity-90 font-pixel">
						You can make any game you want as long as it can be deployed on itch.io! All games made must be deployed and available online for other participants to play and experience. We will only accept itch.io submission links.
						<br>
						<br>
						Here are some cool projects from past hackathons to get you inspired:
					</p>
					
					<ul class="space-y-2 font-pixel text-xl md:text-2xl">
						<li class="flex items-start">
							<span class="mr-4">•</span>
							<a href="https://bucketfish.itch.io/remedy-renemy" target="_blank" class="underline mr-2">Remedy Renemy</a>by Tongyu and Kai Ling
						</li>
						<li class="flex items-start">
							<span class="mr-4">•</span>
							<a href="https://nanomars.itch.io/not-an-idle" target="_blank" class="underline mr-2">Not an Idle</a> by Armand
						</li>
						<li class="flex items-start">
							<span class="mr-4">•</span>
							<a href="https://juanes10201.itch.io/speedtickers" target="_blank" class="underline mr-2">SPEEDTICKERS</a> by Agustin
						</li>
					</ul>
					
					<p class="text-xl md:text-2xl opacity-90 font-pixel leading-relaxed">
						We'll have workshops and activities before Daydream to help you learn game development using Godot! 
					</p>
					
					<!-- Bottom section with input -->
					<div class="flex flex-col md:flex-row md:items-end gap-10 pt-8">
						<div>
							<h3 class="text-3xl md:text-4xl font-pixel mb-4">Stuck?</h3>
							<button 
								class="bg-[#D1E3EE] text-[#061E2D] px-8 py-4 font-pixel text-xl md:text-2xl hover:bg-[#B8D3E0] cursor-pointer max-sm:w-full"
								on:click={dreamIdea}
							>
								Dream an idea for me
							</button>
						</div>
						
						<div class="flex-1">
							<div class="border-2 border-[#D1E3EE] p-6 min-h-40 max-h-40 w-full flex items-start overflow-y-auto idea-output-box">
								{#if ideaText}
									<p class="font-pixel text-xl md:text-2xl text-[#D1E3EE] w-full">
										{ideaText}{#if isTyping}<span class="animate-pulse">|</span>{/if}
									</p>
								{:else if showDice}
									<div class="flex items-center justify-around w-full h-full">
										{#each diceNumbers as diceNumber}
											<img 
												src="/dice/dice-{diceNumber}.png" 
												alt="Dice showing {diceNumber}"
												class="h-24 w-24 object-contain flex-shrink-0 max-w-[30%] [image-rendering:pixelated]"
											/>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
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
				<p class="text-sm">Your laptop, chargers, and an open mind!</p>
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
			<span class="text-gray-700 max-md:hidden">・</span>
			<a href="https://instagram.com/daydreampenang" class="underline text-gray-700 hover:text-gray-900 transition-colors ">Instagram</a>
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

