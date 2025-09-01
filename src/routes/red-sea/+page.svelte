<script lang="ts">
	/**
	 * Enhanced Red Sea Daydream Event Site
	 * Features: Countdown timer, interactive schedule, social media integration,
	 * enhanced animations, mobile responsiveness, and more engaging content
	 */

	// Configuration - Enhanced with more details
	const eventName = "Red Sea";
	const eventLocation = "Red Sea City";
	const eventAddress = "South Valley University Hurghada Branch, Ras Ghareb - Hurghada Rd, Red Sea Governorate";
	const signupLink = "https://forms.hackclub.com/daydream-sign-up?event=recfLqydkliPcUYoe";
	const directionsURL = "https://maps.app.goo.gl/frKTnS8kkmSts9sH6";
	const contactLink = "mailto:redsea.stem.hackclub@gmail.com";
	
	// Event dates and times - 12-hour event
	const eventStartDate = new Date('2025-09-27T10:00:00+02:00'); // Egypt timezone
	const eventEndDate = new Date('2025-09-27T22:00:00+02:00'); // Same day, 12 hours
	
	// Social Media Links
	const socialLinks = {
		instagram: "https://instagram.com/hackclub",
		twitter: "https://twitter.com/hackclub",
		discord: "https://discord.gg/hackclub",
		slack: "https://hackclub.com/slack"
	};
	
	// Enhanced Sponsors Configuration
	const sponsorsEnabled = false; // Hide sponsors for now but keep call to action
	const sponsors = [
		{ 
			image: "/example/logo1.png", 
			name: "Tech Innovation Hub", 
			url: "https://example1.com",
			tier: "platinum"
		},
		{ 
			image: "/example/logo2.png", 
			name: "Digital Dreams Lab", 
			url: "https://example2.com",
			tier: "gold"
		},
		{ 
			image: "/example/logo3.png", 
			name: "Creative Coding Studio", 
			url: "https://example3.com",
			tier: "silver"
		},
		{ 
			image: "/example/logo4.png", 
			name: "Game Dev Academy", 
			url: "https://example4.com",
			tier: "bronze"
		}
	];
	
	// Enhanced Schedule - 12-hour single day event with 2 workshops
	const scheduleData: { 
		title: string; 
		date: string;
		items: { 
			event: string; 
			time: string; 
			description?: string;
			speaker?: string;
			location?: string;
			type?: 'workshop' | 'activity' | 'break' | 'presentation';
		}[] 
	}[] = [
		{
			title: "Saturday, September 27th",
			date: "2025-09-27",
			items: [
				{ 
					event: "Doors Open & Registration", 
					time: "9:30 AM",
					description: "Check-in, get your swag bag, and meet fellow participants",
					location: "Main Hall",
					type: "activity"
				},
				{ 
					event: "Opening Ceremony", 
					time: "10:00 AM",
					description: "Welcome speech, event overview, and team formation",
					location: "Main Auditorium",
					type: "presentation"
				},
				{ 
					event: "Icebreaker Activities", 
					time: "10:30 AM",
					description: "Fun games to get to know your fellow hackers",
					location: "Main Hall",
					type: "activity"
				},
				{ 
					event: "Game Development Workshop 1", 
					time: "11:00 AM",
					description: "Introduction to game development basics and tools",
					speaker: "TBA",
					location: "Workshop Room A",
					type: "workshop"
				},
				{ 
					event: "Lunch Break", 
					time: "12:30 PM",
					description: "Delicious food and networking time",
					location: "Dining Area",
					type: "break"
				},
				{ 
					event: "Game Development Workshop 2", 
					time: "2:00 PM",
					description: "Advanced game mechanics and programming concepts",
					speaker: "TBA",
					location: "Workshop Room A",
					type: "workshop"
				},
				{ 
					event: "Team Building & Brainstorming", 
					time: "3:30 PM",
					description: "Form teams and start brainstorming your game ideas",
					location: "Main Hall",
					type: "activity"
				},
				{ 
					event: "Snack Break", 
					time: "5:00 PM",
					description: "Refreshments and team discussions",
					location: "Lounge Area",
					type: "break"
				},
				{ 
					event: "Development & Mentorship", 
					time: "5:30 PM",
					description: "Build your game with mentor support and guidance",
					location: "Main Hall",
					type: "activity"
				},
				{ 
					event: "Dinner", 
					time: "7:00 PM",
					description: "Delicious dinner and team bonding",
					location: "Dining Area",
					type: "break"
				},
				{ 
					event: "Final Development Sprint", 
					time: "8:00 PM",
					description: "Last push to complete your game project",
					location: "Main Hall",
					type: "activity"
				},
				{ 
					event: "Project Showcase & Awards", 
					time: "9:30 PM",
					description: "Present your game and celebrate achievements",
					location: "Main Auditorium",
					type: "presentation"
				},
				{ 
					event: "Closing Ceremony", 
					time: "10:30 PM",
					description: "Final remarks and future opportunities",
					location: "Main Auditorium",
					type: "presentation"
				}
			]
		}
	];

	// Countdown timer state
	let timeLeft = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};
	
	// Enhanced countdown with progress
	let countdownProgress = 0;
	let totalSecondsUntilEvent = 0;
	let elapsedSeconds = 0;
	
	// Interactive features state
	let showCountdown = true;
	let showSocialLinks = false;
	let currentWorkshop: number | null = null;
	let showFloatingMenu = false;
	let showBackToTop = false;
	
	// Notification system
	let showNotification = false;
	let notificationMessage = "";
	let notificationType = "info";
	
	function showNotificationMessage(message: string, type: "info" | "success" | "warning" = "info") {
		notificationMessage = message;
		notificationType = type;
		showNotification = true;
		
		setTimeout(() => {
			showNotification = false;
		}, 5000);
	}
	
	// Enhanced dice functionality
	let showDice = false;
	let diceNumbers = [1, 1, 1];
	let showDone = false;
	let isRolling = false;
	let ideaText = "";
	let isTyping = false;
	let ideaHistory: string[] = [];
	
	// Scroll handling
	function handleScroll() {
		showBackToTop = window.scrollY > 300;
	}
	
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	
	// Particle system
	let particles: Array<{ id: number; x: number; y: number; opacity: number; rotation: number; velocityY: number; velocityX: number; scale: number }> = [];
	let particleIdCounter = 0;
	let particleContainer: HTMLElement;
	let isTabVisible = true;
	const particleSpeedScale = 0.6;

	// Video popup
	let showVideoPopup = false;
	
	import { onMount } from "svelte";
	import { gsap } from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import Ticker from "$lib/components/Ticker.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import ParticipantSignUp from "$lib/components/ParticipantSignUp.svelte";
	import EnhancedFeatures from "$lib/components/RedSeaFeatures.svelte";
	import { page } from '$app/stores';
	
	/** @type {import('./$types').PageData} */
	export let data;
	
	// Get current URL for dynamic metadata
	$: currentUrl = `https://daydream.hackclub.com${$page.url.pathname}`;
	$: pageTitle = `Daydream ${eventName} - ${eventLocation} Game Jam`;
	$: pageDescription = `Join Daydream ${eventName} in ${eventLocation}! A teen-led game jam where you'll build amazing games with other high schoolers. Food, workshops, and prizes included!`;
	$: pageKeywords = `game jam, hackathon, teen coding, Hack Club, game development, ${eventLocation}, ${eventName}`;

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
Mumbai
Red Sea`.split("\n")

	// Enhanced countdown timer function with progress
	function updateCountdown() {
		const now = new Date().getTime();
		const distance = eventStartDate.getTime() - now;
		
		if (distance > 0) {
			timeLeft = {
				days: Math.floor(distance / (1000 * 60 * 60 * 24)),
				hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
				minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
				seconds: Math.floor((distance % (1000 * 60)) / 1000)
			};
			
			// Calculate progress for visual indicator
			const totalDaysUntilEvent = Math.ceil(distance / (1000 * 60 * 60 * 24));
			const daysSinceAnnouncement = Math.ceil((now - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24));
			const totalDaysFromAnnouncement = Math.ceil((eventStartDate.getTime() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24));
			
			countdownProgress = Math.max(0, Math.min(100, ((totalDaysFromAnnouncement - totalDaysUntilEvent) / totalDaysFromAnnouncement) * 100));
		} else {
			timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
			countdownProgress = 100;
			showCountdown = false;
		}
	}

	// Enhanced idea generation with history
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
				
				await new Promise(resolve => setTimeout(resolve, 1000));
			}
		}
		
		return "How about a game where you collect magical crystals to save a mysterious floating world?";
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
		
		await Promise.all([fetchPromise, dicePromise]);
		
		showDone = false;
		showDice = false;
		isRolling = false;
		
		// Add to history and start typing
		ideaHistory.unshift(fetchResult);
		if (ideaHistory.length > 5) ideaHistory.pop();
		
		await typeText(fetchResult);
	}

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

	// Enhanced particle system
	function createParticle() {
		if (!particleContainer || !isTabVisible) return;
		
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

	// Enhanced path creation functions (keeping existing ones)
	function createSmoothPath(points: Array<{ x: number; y: number }>) {
		if (points.length < 2) return "";
		
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
		
		const segmentCount = points.length - 1;
		const segmentPercentage = percentage * segmentCount;
		const segmentIndex = Math.floor(segmentPercentage);
		const t = segmentPercentage - segmentIndex;
		
		const clampedIndex = Math.min(segmentIndex, segmentCount - 1);
		const clampedT = clampedIndex === segmentIndex ? t : 1;
		
		const p0 = points[clampedIndex];
		const p1 = controlPoints[clampedIndex].cp2;
		const p2 = controlPoints[clampedIndex + 1].cp1;
		const p3 = points[clampedIndex + 1];
		
		const x = Math.pow(1 - clampedT, 3) * p0.x + 
				  3 * Math.pow(1 - clampedT, 2) * clampedT * p1.x + 
				  3 * (1 - clampedT) * Math.pow(clampedT, 2) * p2.x + 
				  Math.pow(clampedT, 3) * p3.x;
		
		const y = Math.pow(1 - clampedT, 3) * p0.y + 
				  3 * Math.pow(1 - clampedT, 2) * clampedT * p1.y + 
				  3 * (1 - clampedT) * Math.pow(clampedT, 2) * p2.y + 
				  Math.pow(clampedT, 3) * p3.y;
		
		const dx = 3 * Math.pow(1 - clampedT, 2) * (p1.x - p0.x) + 
				   6 * (1 - clampedT) * clampedT * (p2.x - p1.x) + 
				   3 * Math.pow(clampedT, 2) * (p3.x - p2.x);
		
		const dy = 3 * Math.pow(1 - clampedT, 2) * (p1.y - p0.y) + 
				   6 * (1 - clampedT) * clampedT * (p2.y - p1.y) + 
				   3 * Math.pow(clampedT, 2) * (p3.y - p2.y);
		
		let angle = Math.atan2(dy, dx) * 180 / Math.PI;
		
		return { x, y, angle };
	}

	function setupPlaneAnimation() {
		const container = document.getElementById("islands-container");
		const airplane = document.getElementById("paper-airplane");
		
		if (!container || !airplane) return;
		
		const planeProgress = { value: 0 };
		
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

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				start: "top 100%",
				end: "bottom 100%",
				scrub: 1.5,
			}
		});

		tl.to(planeProgress, {
			value: 1,
			duration: 1,
			ease: "none",
			onUpdate: updatePlanePosition
		});

		return tl;
	}

	function updatePath() {
		const container = document.getElementById("islands-container");
		const pathElement = document.getElementById("dotted-path");
		
		if (!container || !pathElement) return;
		
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
		
		const pathData = createSmoothPath(points);
		pathElement.setAttribute("d", pathData);
	}

	// Generate ticker text from cities array
	const tickerText = cities.join(" • ");

	onMount(() => {
		console.log('User city:', data.userCity);
		
		// Register GSAP plugins
		gsap.registerPlugin(ScrollTrigger);
		
		// Start countdown timer
		updateCountdown();
		const countdownInterval = setInterval(updateCountdown, 1000);
		
		// Setup parallax effects
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
		
		// Add scroll event listener
		window.addEventListener("scroll", handleScroll);
		
		// Start particle animation
		animateParticles();
		
		// Start particle spawning
		const particleInterval = setInterval(createParticle, 250);
		
		// Cleanup
		return () => {
			clearInterval(countdownInterval);
			window.removeEventListener("scroll", handleScroll);
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
	
	<Ticker {tickerText} />
	
	<!-- brush texture clipped to back buildings -->
	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat pointer-events-none opacity-100 lg:-translate-y-15 bg-center mix-blend-overlay" style="mask-image: url('/buildings-back.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center top; -webkit-mask-image: url('/buildings-back.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center top;"></div>
	
	<div class="buildings-front-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-front.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"></div>
	<!-- brush texture clipped to front buildings -->
	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat pointer-events-none opacity-100 lg:-translate-y-15 bg-center mix-blend-overlay" style="mask-image: url('/buildings-front.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center top; -webkit-mask-image: url('/buildings-front.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center top;"></div>
	
	<!-- Enhanced Hero Section with Countdown Timer -->
	<div class="hero-ui-parallax flex flex-col items-center justify-center text-center relative z-30 -translate-y-2">
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
				Organized by Teenagers in {@html eventLocation.replaceAll(" ", "&nbsp;")}
			</h4>
		</div>
		
		<!-- Enhanced Countdown Timer -->
		{#if showCountdown}
			<div class="mt-8 mb-4 bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 shadow-lg">
				<h5 class="text-lg font-serif text-[#487DAB] mb-4">Event starts in:</h5>
				<div class="flex gap-4 justify-center items-center mb-4">
					<div class="text-center">
						<div class="text-3xl font-bold text-[#487DAB] bg-white/50 rounded-lg px-3 py-2 min-w-[60px]">{timeLeft.days}</div>
						<div class="text-sm text-[#487DAB] mt-1">Days</div>
					</div>
					<div class="text-2xl text-[#487DAB] font-bold">:</div>
					<div class="text-center">
						<div class="text-3xl font-bold text-[#487DAB] bg-white/50 rounded-lg px-3 py-2 min-w-[60px]">{timeLeft.hours}</div>
						<div class="text-sm text-[#487DAB] mt-1">Hours</div>
					</div>
					<div class="text-2xl text-[#487DAB] font-bold">:</div>
					<div class="text-center">
						<div class="text-3xl font-bold text-[#487DAB] bg-white/50 rounded-lg px-3 py-2 min-w-[60px]">{timeLeft.minutes}</div>
						<div class="text-sm text-[#487DAB] mt-1">Minutes</div>
					</div>
					<div class="text-2xl text-[#487DAB] font-bold">:</div>
					<div class="text-center">
						<div class="text-3xl font-bold text-[#487DAB] bg-white/50 rounded-lg px-3 py-2 min-w-[60px]">{timeLeft.seconds}</div>
						<div class="text-sm text-[#487DAB] mt-1">Seconds</div>
					</div>
				</div>
				
				<!-- Progress Bar -->
				<div class="w-full bg-white/30 rounded-full h-3 overflow-hidden">
					<div 
						class="bg-gradient-to-r from-pink to-pink-dark h-full rounded-full transition-all duration-1000 ease-out"
						style="width: {countdownProgress}%"
					></div>
				</div>
				<div class="text-center text-sm text-[#487DAB] mt-2">
					{Math.round(countdownProgress)}% closer to the event!
				</div>
			</div>
		{/if}
		
		<!-- Prominent Registration Button -->
		<div class="mt-8 mb-6 relative z-30">
			<a 
				href={signupLink} 
				target="_blank" 
				rel="noopener noreferrer"
				class="inline-flex items-center gap-3 bg-gradient-to-r from-pink to-pink-dark text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-white/20 hover:border-white/40"
			>
				<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
				</svg>
				Register Now - It's Free!
			</a>
			<p class="text-center text-[#487DAB] mt-2 text-sm opacity-90">Join 100+ students for an amazing game development experience!</p>
		</div>
		
		<div class="relative z-30">
			<ParticipantSignUp {signupLink} {eventName} />
		</div>
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
	
	<img src="/clouds-top-middle.png" alt="" class="absolute left-5/12 -translate-x-1/2 w-7/12 -bottom-24 z-10 pointer-events-none">
	<img src="/clouds-top-right.png" alt="" class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2 z-10 pointer-events-none">
	<img src="/clouds-top-left.png" alt="" class="absolute left-0 w-3/12 -bottom-12  translate-y-1/2 z-10 pointer-events-none">
	

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
				Dear Hackers, Musicians, and Artist,
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

<!-- Call to Action Section -->
<div class="w-full bg-gradient-to-r from-pink to-pink-dark py-16 px-8 relative z-30">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-4xl font-serif text-white mb-6">
			Ready to Create Something Amazing?
		</h2>
		<p class="text-xl text-white/90 mb-8 leading-relaxed">
			Join 100+ students for an unforgettable day of game development, learning, and fun. 
			No experience required - we'll teach you everything you need to know!
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
			<a 
				href={signupLink} 
				target="_blank" 
				rel="noopener noreferrer"
				class="inline-flex items-center gap-3 bg-white text-pink px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
			>
				<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
				</svg>
				Register Now - It's Free!
			</a>
			<a 
				href={contactLink}
				class="inline-flex items-center gap-3 bg-transparent text-white border-2 border-white px-8 py-4 rounded-full text-xl font-bold hover:bg-white hover:text-pink transition-all duration-200"
			>
				<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
				</svg>
				Contact Us
			</a>
		</div>
		<div class="mt-8 grid grid-cols-3 gap-4 text-white/80">
			<div class="text-center">
				<div class="text-2xl font-bold">100+</div>
				<div class="text-sm">Students</div>
			</div>
			<div class="text-center">
				<div class="text-2xl font-bold">12</div>
				<div class="text-sm">Hours</div>
			</div>
			<div class="text-center">
				<div class="text-2xl font-bold">2</div>
				<div class="text-sm">Workshops</div>
			</div>
		</div>
	</div>
</div>

<!-- Enhanced Schedule Container -->
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
				
				<!-- Enhanced Schedule Content -->
				<div class="relative z-10">
					<!-- Schedule for Single Day Event -->
					{#each scheduleData as day, dayIndex}
							<div class="bg-white/50 py-6 -mx-8 rounded-lg">
								<h3 class="text-2xl font-sans font-bold text-[#335969] mb-6 text-center px-8 max-sm:text-xl max-sm:px-4">
									{day.title}
								</h3>
								
								<div class="max-w-4xl mx-auto px-4">
									{#each day.items as item, index}
										<div class="bg-white/30 rounded-lg p-4 mb-4 hover:bg-white/50 transition-all duration-200 cursor-pointer" 
											 on:click={() => currentWorkshop = currentWorkshop === index ? null : index}
											 on:keydown={(e) => e.key === 'Enter' && (currentWorkshop = currentWorkshop === index ? null : index)}
											 role="button"
											 tabindex="0"
											 aria-expanded={currentWorkshop === index}
											 aria-label="Toggle event details for {item.event}">
											<div class="flex items-center justify-between">
												<div class="flex-1">
													<div class="flex items-center gap-3">
														<!-- Event Type Icon -->
														<div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold
															{item.type === 'workshop' ? 'bg-blue-500' : 
															 item.type === 'activity' ? 'bg-green-500' : 
															 item.type === 'break' ? 'bg-orange-500' : 
															 item.type === 'presentation' ? 'bg-purple-500' : 'bg-gray-500'}">
															{item.type === 'workshop' ? 'W' : 
															 item.type === 'activity' ? 'A' : 
															 item.type === 'break' ? 'B' : 
															 item.type === 'presentation' ? 'P' : '•'}
														</div>
														<div>
															<h4 class="text-lg font-sans font-bold text-[#335969]">{item.event}</h4>
															<div class="flex items-center gap-4 text-sm text-[#477783]">
																<span class="flex items-center gap-1">
																	<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
																		<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
																	</svg>
																	{item.time}
																</span>
																{#if item.location}
																	<span class="flex items-center gap-1">
																		<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
																			<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
																		</svg>
																		{item.location}
																	</span>
																{/if}
															</div>
														</div>
													</div>
													
													<!-- Expanded Details -->
													{#if currentWorkshop === index}
														<div class="mt-4 pt-4 border-t border-white/30">
															{#if item.description}
																<p class="text-[#477783] mb-3">{item.description}</p>
															{/if}
															{#if item.speaker}
																<div class="flex items-center gap-2 text-sm text-[#335969]">
																	<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
																		<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
																	</svg>
																	<span class="font-semibold">Speaker:</span> {item.speaker}
																</div>
															{/if}
															<div class="mt-3 flex gap-2">
																<span class="px-2 py-1 bg-white/50 rounded text-xs font-semibold text-[#335969]">
																	{(item.type || 'Event').charAt(0).toUpperCase() + (item.type || 'Event').slice(1)}
																</span>
																{#if item.location && item.location !== 'Online'}
																	<span class="px-2 py-1 bg-blue-100 rounded text-xs font-semibold text-blue-800">
																		In-Person
																	</span>
																{:else if item.location === 'Online'}
																	<span class="px-2 py-1 bg-green-100 rounded text-xs font-semibold text-green-800">
																		Online
																	</span>
																{/if}
															</div>
														</div>
													{/if}
												</div>
												<div class="ml-4">
													<svg class="w-5 h-5 text-[#477783] transition-transform duration-200 {currentWorkshop === index ? 'rotate-180' : ''}" fill="currentColor" viewBox="0 0 24 24">
														<path d="M7 10l5 5 5-5z"/>
													</svg>
												</div>
											</div>
										</div>
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
<!-- Enhanced Sponsors Section -->
<div class="w-full bg-[#FCEFC5] pb-16 pt-6 px-8 flex justify-center">
	<div class="relative max-w-4xl w-full">
		<!-- Billboard Container -->
		<div class="relative bg-[#f0f9ff] border-[10px] border-b-[16px] border-[#888896] rounded-lg rounded-b-xl mx-auto z-40">
			<!-- Header Section -->
			<div class="w-full bg-[url('/billboard-bg-texture.png')] bg-contain bg-repeat py-6 relative" style="border-bottom: 8px solid #B4B4C5;">
				<h2 class="text-4xl font-serif text-[#F0F0FF] text-center">
					Our Amazing Sponsors
				</h2>
				<!-- Brush texture overlay for header -->
				<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
			</div>
			
			<!-- Main Content Area -->
			<div class="relative bg-gradient-to-b from-[#CCF4FD] to-[#AECDF6] px-8 pt-8 pb-16">
				<!-- Brush texture overlay for content -->
				<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
				
				<!-- Enhanced Sponsors Grid -->
				<div class="relative z-10 min-h-40">
					{#if sponsors.length > 0}
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{#each sponsors as sponsor}
								<div class="bg-white/30 rounded-xl p-6 hover:bg-white/50 transition-all duration-300 hover:scale-105 shadow-lg">
									<div class="text-center">
										<div class="mb-4">
											<span class="px-3 py-1 rounded-full text-xs font-bold text-white
												{sponsor.tier === 'platinum' ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
												 sponsor.tier === 'gold' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
												 sponsor.tier === 'silver' ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
												 'bg-gradient-to-r from-amber-600 to-amber-800'}">
												{sponsor.tier?.toUpperCase()}
											</span>
										</div>
										<a href={sponsor.url} target="_blank" rel="noopener noreferrer" class="block">
											<div class="bg-white/50 rounded-lg p-4 h-24 flex items-center justify-center mb-3 hover:bg-white/70 transition-colors">
												<img src={sponsor.image} alt={sponsor.name} class="max-w-full max-h-full object-contain">
											</div>
											<h3 class="font-bold text-[#335969] text-lg">{sponsor.name}</h3>
										</a>
									</div>
								</div>
							{/each}
						</div>
					{/if}
					
					{#if contactLink}
						<!-- Enhanced Call to action for sponsors -->
						<div class="mt-12 text-center">
							<div class="bg-white/40 rounded-xl p-8 max-w-2xl mx-auto">
								<h3 class="text-2xl font-bold text-[#335969] mb-4">Become a Sponsor</h3>
								<p class="text-lg text-[#477783] mb-6">Join our amazing sponsors and support the next generation of game developers!</p>
								<a href={contactLink} class="inline-block bg-pink text-white px-8 py-3 rounded-lg font-bold hover:bg-pink-dark transition-colors shadow-lg hover:shadow-xl">
									Get in Touch
								</a>
							</div>
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

		<!-- Enhanced Features Component -->
		<EnhancedFeatures {eventName} />
		
		<!-- What's New Section -->
		<div class="w-full bg-gradient-to-b from-[#FEC1CF] to-[#FCEFC5] py-16 px-8">
			<div class="max-w-4xl mx-auto">
				<h2 class="text-4xl font-serif text-center text-[#8B4513] mb-12">
					What's New at Daydream Red Sea
				</h2>
				
				<div class="grid md:grid-cols-2 gap-8">
					<div class="bg-white/60 rounded-lg p-6 shadow-lg">
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 bg-pink rounded-full flex items-center justify-center text-white text-xl">
								🎮
							</div>
							<h3 class="text-xl font-bold text-[#335969]">Enhanced Workshops</h3>
						</div>
						<p class="text-[#477783] leading-relaxed">
							We've upgraded our game development workshops with the latest Godot engine features and hands-on coding sessions. Perfect for beginners and experienced developers alike!
						</p>
					</div>
					
					<div class="bg-white/60 rounded-lg p-6 shadow-lg">
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 bg-pink rounded-full flex items-center justify-center text-white text-xl">
								🏆
							</div>
							<h3 class="text-xl font-bold text-[#335969]">Exciting Prizes Coming</h3>
						</div>
						<p class="text-[#477783] leading-relaxed">
							We're working on some amazing prizes for the best games! Stay tuned for announcements about what you could win for your creative projects.
						</p>
					</div>
					
					<div class="bg-white/60 rounded-lg p-6 shadow-lg">
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 bg-pink rounded-full flex items-center justify-center text-white text-xl">
								🤝
							</div>
							<h3 class="text-xl font-bold text-[#335969]">Team Building Activities</h3>
						</div>
						<p class="text-[#477783] leading-relaxed">
							New icebreaker activities and team formation sessions to help you connect with fellow developers and form the perfect team for your game project.
						</p>
					</div>
					
					<div class="bg-white/60 rounded-lg p-6 shadow-lg">
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 bg-pink rounded-full flex items-center justify-center text-white text-xl">
								🍕
							</div>
							<h3 class="text-xl font-bold text-[#335969]">Enhanced Catering</h3>
						</div>
						<p class="text-[#477783] leading-relaxed">
							We've improved our food and refreshment options to keep you energized throughout the 12-hour event. Healthy snacks and delicious meals included!
						</p>
					</div>
				</div>
			</div>
		</div>

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
					src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14178.910464942159!2d33.6640017!3d27.321712!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1452650624737cf1%3A0xb515a00886782913!2sSouth%20Valley%20University%20Hurghada%20Branch!5e0!3m2!1sen!2seg!4v1756069424823!5m2!1sen!2seg"
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

<Footer />

<!-- Floating Action Menu -->
<div class="fixed bottom-6 left-6 z-50">
	<button 
		class="bg-pink text-white p-4 rounded-full shadow-lg hover:bg-pink-dark transition-all duration-200 hover:scale-110"
		on:click={() => showFloatingMenu = !showFloatingMenu}
		aria-label="Quick actions menu"
	>
		{#if showFloatingMenu}
			<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
				<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
			</svg>
		{:else}
			<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
				<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
			</svg>
		{/if}
	</button>
	
	{#if showFloatingMenu}
		<div class="absolute bottom-16 left-0 space-y-2">
			<a 
				href={signupLink} 
				target="_blank" 
				rel="noopener noreferrer"
				class="block bg-white text-pink p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 hover:scale-110"
				aria-label="Register for the event"
			>
				<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
				</svg>
			</a>
			<a 
				href={directionsURL} 
				target="_blank" 
				rel="noopener noreferrer"
				class="block bg-white text-pink p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 hover:scale-110"
				aria-label="Get directions to the venue"
			>
				<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
				</svg>
			</a>
			<a 
				href={contactLink} 
				class="block bg-white text-pink p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 hover:scale-110"
				aria-label="Contact the organizers"
			>
				<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
				</svg>
			</a>
		</div>
	{/if}
</div>

<!-- Back to Top Button -->
{#if showBackToTop}
	<button 
		class="fixed bottom-6 right-20 z-50 bg-pink text-white p-4 rounded-full shadow-lg hover:bg-pink-dark transition-all duration-200 hover:scale-110"
		on:click={scrollToTop}
		aria-label="Back to top"
	>
		<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
			<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
		</svg>
	</button>
{/if}

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

<!-- Notification System -->
{#if showNotification}
	<div class="fixed top-6 right-6 z-60 max-w-sm">
		<div class="bg-white rounded-lg shadow-lg border-l-4 p-4 {notificationType === 'success' ? 'border-green-500' : notificationType === 'warning' ? 'border-yellow-500' : 'border-blue-500'}">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					{#if notificationType === 'success'}
						<svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
						</svg>
					{:else if notificationType === 'warning'}
						<svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
						</svg>
					{:else}
						<svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
						</svg>
					{/if}
				</div>
				<div class="ml-3">
					<p class="text-sm font-medium text-gray-900">{notificationMessage}</p>
				</div>
				<div class="ml-auto pl-3">
					<button 
						class="text-gray-400 hover:text-gray-600"
						on:click={() => showNotification = false}
					>
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

