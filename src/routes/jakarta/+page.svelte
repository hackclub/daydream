<script lang="ts">
	/**
	 * This is the template site! Create a copy of this folder (src/routes/example)
	 * and rename it to whatever you want your URL to be.
	 *
	 * Then, configure the event name, location, and schedule below:
	 */

	// Configuration - Put your information here!
	const eventName = 'Jakarta';
	const eventLocation = 'Jakarta';
	const eventAddress = ''; // Leave this empty if you don't want an address
	// These two are optional
	const directionsURL = '';
	const contactLink = 'jakarta@daydream.hackclub.com';

	// Fillout Block Notice
	// In Indonesia, Fillout forms (specifically Hack Club ones) are currently inaccessible because of government restrictions. As a workaround, we notice user to recommend using a VPN (We recommend Cloudflare Warp) to access the forms.
	let hasClickedFilloutButton = false;

	// Language support
	let currentLanguage: 'id' | 'en' = 'id'; // Default to Indonesian
	const languages: Record<'id' | 'en', Record<string, string>> = {
		id: {
			title: 'Daydream Jakarta - Game Jam untuk Siswa Remaja',
			description:
				'Bergabunglah dengan Daydream di Jakarta! Game jam yang dipimpin remaja di mana kamu akan membuat game luar biasa bersama siswa remaja lainnya. Makanan, workshop, dan hadiah sudah termasuk!',
			keywords:
				'game jam, hackathon, coding remaja, Hack Club, pengembangan game, Jakarta, Daydream Jakarta',
			date: '27 & 28 September 2025',
			subtitle: 'Lomba Game Jam untuk siswa!',
			organizedBy: 'Diselenggarakan oleh Remaja di',
			getStickers: 'Dapatkan stiker gratis',
			getStickersTroubleshootTitle: 'Kami sedang ada masalah disini.',
			getStickersTroubleshootDescription:
				'Saat ini, seluruh formulir Fillout (khusus Hack Club) tidak dapat diakses di Indonesia. Untuk sementara, kamu bisa memakai VPN (Direkomendasikan Cloudflare Warp) sebagai alternatif sampai masalah ini selesai. Tenang saja, stiker kamu akan tetap sampai kok! Silahkan klik tombol ini lagi jika kamu sudah mengerti.',
			getStickersTroubleshootConfirm: 'Oke, mengerti',
			dearHackers: 'Kepada Hacker, Musisi, dan Seniman,',
			welcome:
				'Selamat datang di petualangan terbaru Hack Club. Di Musim ini, kami mengundang Anda untuk bergabung dengan kami di Daydream, Game Jam terbesar di dunia yang berlangsung secara serentak di 100 kota.',
			hackClubWants: 'Hack Club ingin kamu membuat game di musim ini.',
			notGameDev:
				'Bukan game dev? Tidak masalah! - kami memiliki banyak workshop untuk kamu membuat game pertama!',
			invite:
				'Di Musim gugur ini, kami mengundang kamu untuk belajar hal baru, membuat sesuatu yang benar-benar kamu banggakan, bertemu teman baru, dan pergi dalam petualangan luar biasa bersama.',
			withLove: 'Dengan cinta,',
			fromHq: 'Augie dan Renran dari Hack Club HQ',
			schedule: 'Jadwal',
			sponsors: 'Sponsors',
			communityPartners: 'Media Partners',
			wantToSponsor: 'Ingin mensponsori Daydream Jakarta?',
			getInTouch: 'Hubungi kami',
			howToWin: 'Begini Cara Anda Menang',
			gameJam: 'Game Jam',
			step1: '#1: Daftar Daydream Jakarta',
			step2: '#2: Hadiri workshop dan pelajari cara membuat game',
			step3: '#3: Temukan tim lainnya di acara',
			step4: '#4: Mulai buat game kamu - tidak perlu pengalaman',
			step5: '#5: Bagikan apa yang kamu buat ke dunia!',
			findDaydream: 'Temukan Event Daydream Dekat kamu',
			takingPlace: 'Daydream Jakarta berlangsung di',
			whatWillYou: 'Apa yang akan kamu',
			dream: 'Impikan?',
			anyGame:
				'Anda dapat membuat game apa saja selama bisa dikirim ke itch.io! Semua game yang sudah dibuat harus dikirim dan tersedia online agar peserta lain dapat memainkannya. Kami hanya akan menerima link submission itch.io.',
			coolProjects:
				'Berikut adalah beberapa proyek keren dari hackathon sebelumnya untuk menginspirasi kamu:',
			workshops:
				'Kami akan memiliki workshop dan kegiatan sebelum Daydream untuk membantu Anda belajar membuat game menggunakan Godot!',
			stuck: 'Bingung?',
			dreamIdea: 'Impikan ide untuk saya',
			faq: 'FAQ',
			whoCanParticipate: 'Siapa yang dapat berpartisipasi di Daydream?',
			allStudents: 'Semua siswa SMP/Sederajat hingga SMA/Sederajat dipersilakan datang!',
			forFree: 'Semua ini, gratis?',
			yep: 'Ya! Makanan, souvenir dan suasana nyaman, semua termasuk.',
			whatDoINeed: 'Apa yang saya butuhkan?',
			need: 'Laptop, charger, perlengkapan mandi, sleeping bag, dan pikiran kreatif!',
			whatHasHackClubDone: 'Apa yang Hack Club lakukan sebelumnya?',
			hackClubDone:
				'Hack Club telah menjalankan hackathon di GitHub HQ, Game Jam di 50 kota, hackathon di kereta dari Vermont ke Los Angeles, dan banyak lagi!',
			notGoodAtCoding: 'Saya tidak pandai coding. Bisakah saya tetap berpartisipasi?',
			allSkillLevels:
				'Game jam ini untuk semua tingkat keterampilan! Kami akan memiliki workshop dan acara lainnya jadi bergabunglah dengan kami dan mari belajar bersama.',
			parentsConcerned: 'Bagaimana jika orang tua saya khawatir?',
			helpParents:
				'Kami di sini untuk membantu! Mereka dapat melihat panduan orang tua kami di sini, atau menghubungi kami di daydream@hackclub.com untuk pertanyaan.',
			whatCanIMake: 'Apa yang dapat saya buat di Daydream?',
			anyType:
				'GAME apa saja berdasarkan tema! Platformer, visual novel, clicker game, dll. Jadilah se-kreatif mungkin!',
			// Schedule translations
			saturdayTitle: 'Sabtu, 27 September',
			sundayTitle: 'Minggu, 28 September',
			doorsOpen: 'Pintu Dibuka',
			openingCeremony: 'Opening Ceremony',
			lunch: 'Makan Siang',
			startWorking: 'Start working on your project!',
			workshop1: 'Workshop 1',
			activity1: 'Aktivitas 1',
			workshop2: 'Workshop 2',
			dinner: 'Makan Malam',
			lightningTalks: 'Lightning Talks',
			midnightSurprise: 'Midnight Surprise',
			breakfast: 'Sarapan',
			demos: 'Demo!',
			closingCeremony: 'Closing Ceremony'
		},
		en: {
			title: 'Daydream Jakarta - Game Jam for High Schoolers',
			description:
				"Join Daydream in Jakarta! A teen-led game jam where you'll build amazing games with other high schoolers. Food, workshops, and prizes included!",
			keywords:
				'game jam, hackathon, teen coding, Hack Club, game development, Jakarta, Daydream Jakarta',
			date: 'September 27th & 28th, 2025',
			subtitle: 'Game jam for high schoolers',
			organizedBy: 'Organized by Teenagers in',
			getStickers: 'Get free stickers',
			getStickersTroubleshootTitle: "We're having some issues here.",
			getStickersTroubleshootDescription:
				"Currently, all fillout forms (specifically Hack Club ones) are inaccessible in Indonesia. For now, you can use a VPN (We recommend Cloudflare Warp) as an alternative until this issue is resolved. Don't worry, your stickers will still arrive! Please click the button again if you understand.",
			getStickersTroubleshootConfirm: 'Okay, got it',
			dearHackers: 'Dear Hackers, Musicians, and Artists,',
			welcome:
				"Welcome to Hack Club's newest adventure. This fall we invite you to join us for Daydream, the world's biggest Game Jam happening simultaneously in 100 cities.",
			hackClubWants: 'Hack Club wants you to make a game this fall.',
			notGameDev:
				"Don't consider yourself a game dev? No problem - we have tons of online and in-person workshops for you to make your first game!",
			invite:
				"This fall, we invite you to learn something new, make something you're really proud of, meet new friends, and go on an incredible adventure together.",
			withLove: 'With love,',
			fromHq: 'Augie and Renran from Hack Club HQ',
			schedule: 'Schedule',
			sponsors: 'Sponsors',
			communityPartners: 'Media Partners',
			wantToSponsor: 'Want to sponsor Daydream Jakarta?',
			getInTouch: 'Get in touch',
			howToWin: "Here's How You Win a",
			gameJam: 'Game Jam',
			step1: '#1: Sign up for Daydream Jakarta',
			step2: '#2: Attend a workshop and learn about game development',
			step3: '#3: Find a team of other teenagers at the event',
			step4: '#4: Start building your game - no experience needed',
			step5: '#5: Share what you made with the world!',
			findDaydream: 'Find a Daydream Near You',
			takingPlace: 'Daydream Jakarta is taking place at',
			whatWillYou: 'What will you',
			dream: 'Dream?',
			anyGame:
				'You can make any game you want as long as it can be deployed on itch.io! All games made must be deployed and available online for other participants to play and experience. We will only accept itch.io submission links.',
			coolProjects: 'Here are some cool projects from past hackathons to get you inspired:',
			workshops:
				"We'll have workshops and activities before Daydream to help you learn game development using Godot!",
			stuck: 'Stuck?',
			dreamIdea: 'Dream an idea for me',
			faq: 'FAQ',
			whoCanParticipate: 'Who can participate in Daydream?',
			allStudents: 'All high-school & upper-middle-school aged students are welcome to come!',
			forFree: 'All this, for free?',
			yep: 'Yep! Food, swag and good vibes are all included.',
			whatDoINeed: 'What do I need?',
			need: 'Your laptop, chargers, toiletries, sleeping bags, and a creative mind!',
			whatHasHackClubDone: 'What has Hack Club done before?',
			hackClubDone:
				'Hack Club has run a hackathon in at GitHub HQ, a Game Jam in 50 cities, a hackathon on a train from Vermont to Los Angeles, and more!',
			notGoodAtCoding: "I'm not good at coding. Can I still participate?",
			allSkillLevels:
				"This game jam is for all skill levels! We'll have workshops and other events so join us and let's learn together.",
			parentsConcerned: 'What if my parents are concerned?',
			helpParents:
				"We're here to help! You can see our parent guide here, or they can reach out to us at daydream@hackclub.com for questions.",
			whatCanIMake: 'What can I make at Daydream?',
			anyType:
				'ANY type of game based on the theme! Platformer, visual novel, clicker game, etc. Be as creative as possible!',
			// Schedule translations
			saturdayTitle: 'Saturday, September 27th',
			sundayTitle: 'Sunday, September 28th',
			doorsOpen: 'Doors open',
			openingCeremony: 'Opening ceremony',
			lunch: 'Lunch',
			startWorking: 'Start working on your project!',
			workshop1: 'Workshop 1',
			activity1: 'Activity 1',
			workshop2: 'Workshop 2',
			dinner: 'Dinner',
			lightningTalks: 'Lightning talks',
			midnightSurprise: 'Midnight surprise',
			breakfast: 'Breakfast',
			demos: 'Demos!',
			closingCeremony: 'Closing ceremony'
		}
	};

	$: t = languages[currentLanguage];

	// Sponsors Configuration
	const signupLink = 'https://daydreamjakarta.fillout.com/rsvp'; // Get your custom sign up link from this page: https://airtable.com/apppg7RHZv6feM66l/shr4kFqURo8fMIRie
	const sponsors = [
		{
			image: '/jakarta/sponsors/twibbonize.png',
			name: 'Twibbonize',
			url: 'https://twibbonize.com/'
		}
	];
	const communityPartners = [
		{
			image: '/jakarta/partners/intergalactic-science-kingdom.png',
			name: 'Intergalactic Science Kingdom',
			url: 'https://discord.gg/fajrulfx'
		},
		{
			image: '/jakarta/partners/web-programming-unpas.png',
			name: 'Web Programming Unpas',
			url: 'https://discord.gg/wpu'
		}
	];

	// Schedule Configuration - You don't need to use this exact schedule, this is just an example!
	$: scheduleData = [
		{
			title: t.saturdayTitle,
			items: [
				{ event: t.doorsOpen, time: '11:00 AM' },
				{ event: t.openingCeremony, time: '12:00 PM' },
				{ event: t.lunch, time: '12:30 PM' },
				{ event: t.startWorking, time: '1:00 PM' },
				{ event: t.workshop1, time: '2:00 PM' },
				{ event: t.activity1, time: '4:00 PM' },
				{ event: t.workshop2, time: '4:00 PM' },
				{ event: t.dinner, time: '6:00 PM' },
				{ event: t.lightningTalks, time: '8:00 PM' },
				{ event: t.midnightSurprise, time: '12:00 AM' }
			]
		},
		{
			title: t.sundayTitle,
			items: [
				{ event: t.breakfast, time: '8:00 AM' },
				{ event: t.demos, time: '10:30 AM' },
				{ event: t.closingCeremony, time: '12:00 PM' }
			]
		}
	];

	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Ticker from '$lib/components/Ticker.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ParticipantSignUp from '$lib/components/ParticipantSignUp.svelte';
	import { page } from '$app/stores';
	import { toast, Toaster } from 'svelte-sonner';

	/** @type {import('./$types').PageData} */
	export let data;

	// Get current URL for dynamic metadata
	$: currentUrl = `https://daydream.hackclub.com${$page.url.pathname}`;
	$: pageTitle = t.title;
	$: pageDescription = t.description;
	$: pageKeywords = t.keywords;

	function handleFormSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
		const email = emailInput.value;

		if (email) {
			window.location.href = `https://daydreamjakarta.fillout.com/rsvp?email=${encodeURIComponent(email)}`;
		}
	}

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
			const angleRadians = ((pointAngles[i] || 0) * Math.PI) / 180; // Convert to radians

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
			const angleRadians = ((pointAngles[i] || 0) * Math.PI) / 180;

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

	// Dice functionality state
	let showDice = false;
	let diceNumbers = [1, 1, 1]; // Default dice values
	let showDone = false;
	let isRolling = false;
	let ideaText = '';
	let isTyping = false;

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
		scale: number;
	}> = [];
	let particleIdCounter = 0;
	let particleContainer: HTMLElement;
	let isTabVisible = true;
	const particleSpeedScale = 0.6;

	function openVideoPopup() {
		console.log('HERE');
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
		ideaText = '';

		for (let i = 0; i <= text.length; i++) {
			ideaText = text.slice(0, i);
			await new Promise((resolve) => setTimeout(resolve, 20));
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
						'Content-Type': 'application/json'
					}
				});

				if (!response.ok) {
					if (response.status === 500) {
						throw new Error(`Server error: ${response.status}`);
					} else {
						// Don't retry on non-500 errors
						return 'How about a game where you collect magical crystals to save a mysterious floating world?';
					}
				}

				const data = await response.json();
				return data.idea;
			} catch (error) {
				attempt++;
				console.warn(`Attempt ${attempt} failed:`, error);

				if (attempt >= maxAttempts) {
					return 'How about a game where you collect magical crystals to save a mysterious floating world?';
				}

				// Wait before retrying
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
		}

		return 'How about a game where you collect magical crystals to save a mysterious floating world?';
	}

	async function dreamIdea() {
		if (isRolling) return;

		isRolling = true;
		showDone = false;
		showDice = true;
		ideaText = '';

		const startTime = Date.now();
		const minDuration = 1000;
		let fetchComplete = false;
		let fetchResult: string = '';

		// Start fetch and dice animation concurrently
		const fetchPromise = fetchIdea().then((result) => {
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

				await new Promise((resolve) => setTimeout(resolve, 100));
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
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

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
	<script
		defer
		data-domain="daydream.hackclub.com"
		src="https://plausible.io/js/script.js"
	></script>
</svelte:head>

<div
	class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
></div>

<Toaster richColors />

<div
	class="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-[#CCF4FD] to-[#B8D9F8] bg-blend-overlay relative"
>
	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-30 pointer-events-none"
	></div>

	<!-- Cloudy Background -->
	<div
		class="cloudy-bg-parallax absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[80vh] bg-[url(/cloudy-bg.png)] opacity-30 bg-cover bg-no-repeat bg-top pointer-events-none"
	></div>

	<div
		class="buildings-back-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-back.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"
	></div>

	<Ticker {tickerText} />

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
	<!-- Language Switcher -->
	<div class="absolute top-4 right-4 z-50">
		<button
			class="bg-black/20 hover:bg-black/40 text-white px-3 p-2 fixed flex justify-center top-4 right-4 items-center py-1 rounded-full text-xs transition-colors"
			on:click={() => (currentLanguage = currentLanguage === 'id' ? 'en' : 'id')}
		>
			<img
				src={currentLanguage === 'en'
					? 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg'
					: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg'}
				alt={currentLanguage === 'en' ? 'Indonesia' : 'English'}
				class="inline-block w-8 h-5 mr-2 align-middle rounded-md"
			/>
			{currentLanguage === 'en' ? 'Indonesia' : 'English'}
		</button>
	</div>
	<div
		class="hero-ui-parallax flex flex-col items-center justify-center text-center relative z-5 -translate-y-2"
	>
		<div class="inline-block relative">
			<div class="h-12"></div>
			<!-- space for the ship -->
			<h2
				class="text-xl font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent absolute left-1/2 max-sm:translate-y-4 max-sm:mb-0 max-md:-mb-8 md:left-[calc(50%+4rem)] -translate-x-1/2 bottom-8 italic w-max md:text-lg max-sm:text-lg"
			>
				{t.date}
			</h2>
			<img
				src="/jakarta/assets/daydream.png"
				alt="Daydream"
				class="h-40 mb-6 w-auto object-contain max-w-full px-4"
			/>
			<a
				href="https://hackclub.com"
				class="absolute top-8 left-40 max-sm:right-0 max-sm:scale-80 animate-hover ![animation-delay:0.9s] ![--hover:-0.2rem]"
			>
				<img src="flag-plane.png" alt="Hack Club" class="h-20" />
			</a>
		</div>
		<div class="relative inline-block px-4">
			<h3
				class="text-3xl italic font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent w-max max-sm:text-2xl mx-auto"
			>
				{t.subtitle}
			</h3>
			<img
				src="underline.svg"
				alt=""
				class="absolute left-1/2 -translate-x-1/2 -mt-1 h-auto scale-115"
			/>
			<h4
				class="text-2xl opacity-90 mt-2 font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent max-sm:text-xl"
			>
				{t.organizedBy}
				{@html eventLocation.replaceAll(' ', '&nbsp;')}
			</h4>
		</div>

		<div class="mt-8 flex flex-col items-center gap-3 z-5 max-md:scale-90">
			<div class="relative rounded-full overflow-hidden" style="padding: 2px 2px 5px 2px;">
				<form
					on:submit={handleFormSubmit}
					class="rounded-full bg-white border-2 border-dark font-sans p-2 flex flex-row items-center gap-2 shadow-[0_3px_0_0_theme(colors.dark)] focus-within:border-pink focus-within:shadow-[0_3px_0_0_#E472AB] has-[button:active]:border-dark has-[button:active]:shadow-[0_3px_0_0_theme(colors.dark)] has-[button:focus]:border-dark has-[button:focus]:shadow-[0_3px_0_0_theme(colors.dark)]"
				>
					<input
						type="email"
						name="email"
						placeholder="Enter email to sign up"
						class="w-80 px-3 py-1 text-dark focus:outline-none flex-1"
						required
					/>
					<button
						type="submit"
						class="bg-light h-full px-5 py-[0.45rem] rounded-full border-b-2 border-[#B3866A] cursor-pointer hover:border-b-4 hover:transform active:border-b-0 active:transform active:translate-y-0.5 focus:outline-none transition-all duration-100 flex-shrink-0"
					>
						<img src="submit.svg" alt="Go" />
					</button>
				</form>
			</div>
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
		class="absolute left-5/12 -translate-x-1/2 w-7/12 -bottom-24 z-20 pointer-events-none"
	/>
	<img
		src="/clouds-top-right.png"
		alt=""
		class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2 z-20 pointer-events-none"
	/>
	<img
		src="/clouds-top-left.png"
		alt=""
		class="absolute left-0 w-3/12 -bottom-12 translate-y-1/2 z-20 pointer-events-none"
	/>

	<!-- Desktop stickers button (bottom left) -->
	<button
		on:click={() => {
			if (hasClickedFilloutButton) {
				window.open('https://forms.hackclub.com/daydream-stickers', '_blank');
			} else {
				toast.warning(t.getStickersTroubleshootTitle, {
					description: t.getStickersTroubleshootDescription,
					duration: 30000,
					closeButton: true,
					class: 'min-w-lg',
					position: 'top-left'
				});

				hasClickedFilloutButton = true;
			}
		}}
		class="hidden md:block absolute bottom-16 left-16 z-50 w-max px-4 py-2 bg-pink border-b-2 border-b-pink-dark text-white rounded-full active:transform active:translate-y-0.5 transition-all duration-100 font-sans cursor-pointer overflow-visible hover:shadow-[0_2px_0_0_theme(colors.pink.dark)] hover:-translate-y-[2px] active:border-transparent active:shadow-none"
	>
		{t.getStickers}
		<img
			src="button-clouds.svg"
			alt=""
			class="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto object-contain pointer-events-none"
		/>
		<img
			src="rock-sticker.png"
			alt=""
			class="absolute bottom-2 right-3 translate-2/3 w-18 h-18 object-contain pointer-events-none"
			style="transform: rotate(-15deg);"
		/>
	</button>
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
			class="relative z-20 px-20 pt-20 pb-52 rounded-lg mb-0 max-sm:px-18"
			style="background-image: url('/letter-top.png'), linear-gradient(to bottom, #FCEFC5 100px, transparent 100px), url('/letter-loop.png'); background-size: 100% auto, 100% auto, 100% auto; background-repeat: no-repeat, no-repeat, repeat-y; background-position: top, top, top; background-attachment: local, local, local;"
		>
			<div
				class="absolute bottom-0 left-0 w-full h-24 z-10 pointer-events-none bg-[url('/clouds-loop.png')] bg-repeat-x bg-bottom bg-contain"
			></div>
			<h2 class="text-5xl font-serif italic text-[#8B4513] mb-10 relative">
				{t.dearHackers}
				<img src="/underline.svg" alt="" class="absolute left-0 -bottom-3 w-64 h-auto opacity-70" />
			</h2>

			<div class="text-[#8B4513] font-serif text-xl leading-relaxed space-y-8">
				<p>
					{t.welcome}
				</p>

				<p class="font-bold text-2xl">{t.hackClubWants}</p>

				<p>
					{t.notGameDev}
				</p>

				<p>
					{t.invite}
				</p>

				<p class="mb-2">{t.withLove}</p>

				<p class="italic text-2xl opacity-85">{t.fromHq}</p>
			</div>
		</div>
	</div>

	<div
		class="w-full absolute z-30 max-h-64 bottom-0 max-2xl:translate-y-1/4 max-lg:translate-y-1/2 pointer-events-none"
	>
		<img src="/cloud-cover-1.png" alt="" class="w-full h-full object-contain min-[2048px]:hidden" />
	</div>
</div>

<!-- Schedule Container -->
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
				<h2 class="text-4xl font-serif text-[#F0F0FF] text-center">{t.schedule}</h2>
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

<!-- Second Billboard Section -->
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

				<h3
					class="text-3xl font-sans font-bold text-[#335969] mt-4 mb-2 text-center px-8 max-sm:text-xl max-sm:px-4"
				>
					{t.sponsors}
				</h3>

				<!-- Sponsors Grid -->
				<div class="relative z-10 min-h-40">
					{#if sponsors.length > 0}
						<!-- First row (up to 4 sponsors) -->
						{#if sponsors.length > 4}
							<div
								class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-8"
							>
								{#each sponsors.slice(0, 4) as sponsor}
									<a
										href={sponsor.url}
										class="bg-white/20 rounded-lg p-4 w-full h-20 flex items-center justify-center hover:bg-white/40 transition-colors"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src={sponsor.image}
											alt={sponsor.name}
											class="max-w-full max-h-full object-contain"
										/>
									</a>
								{/each}
							</div>

							<!-- Second row (remaining sponsors, centered) -->
							{#if sponsors.length > 4}
								<div class="flex justify-center">
									<div
										class="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center max-w-2xl"
									>
										{#each sponsors.slice(4) as sponsor, index}
											<a
												href={sponsor.url}
												class="bg-white/20 rounded-lg p-4 w-full h-20 flex items-center justify-center hover:bg-white/40 transition-colors {sponsors.slice(
													4
												).length === 3 && index === 2
													? 'md:col-span-1 col-span-2 max-w-xs mx-auto'
													: ''}"
												target="_blank"
												rel="noopener noreferrer"
											>
												<img
													src={sponsor.image}
													alt={sponsor.name}
													class="max-w-full max-h-full object-contain"
												/>
											</a>
										{/each}
									</div>
								</div>
							{/if}
						{:else}
							<!-- Single row for 4 or fewer sponsors -->
							<div class="flex justify-center">
								<div
									class="grid gap-8 items-center justify-items-center max-w-4xl {sponsors.length ===
									1
										? 'grid-cols-1'
										: sponsors.length === 2
											? 'grid-cols-1 md:grid-cols-2'
											: sponsors.length === 3
												? 'grid-cols-2 md:grid-cols-3'
												: 'grid-cols-2 md:grid-cols-4'}"
								>
									{#each sponsors as sponsor}
										<a
											href={sponsor.url}
											class="bg-white/20 rounded-lg p-4 w-full h-20 flex items-center justify-center hover:bg-white/40 transition-colors"
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												src={sponsor.image}
												alt={sponsor.name}
												class="max-w-full max-h-full object-contain"
											/>
										</a>
									{/each}
								</div>
							</div>
						{/if}
					{/if}

					{#if communityPartners.length > 0}
						<h3
							class="text-xl font-sans font-bold text-[#335969] mt-8 mb-2 text-center px-8 max-sm:text-xl max-sm:px-4"
						>
							{t.communityPartners}
						</h3>
						<div class="flex justify-center mb-4 bg-white/20 rounded-lg p-4">
							<div
								class="grid gap-8 items-center justify-items-center max-w-4xl {communityPartners.length ===
								1
									? 'grid-cols-1'
									: communityPartners.length === 2
										? 'grid-cols-1 md:grid-cols-2'
										: communityPartners.length === 3
											? 'grid-cols-2 md:grid-cols-3'
											: 'grid-cols-2 md:grid-cols-4'}"
							>
								{#each communityPartners as partner}
									<a
										href={partner.url}
										class="w-full h-10 flex items-center justify-center transition-colors"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src={partner.image}
											alt={partner.name}
											class="max-w-full max-h-full object-contain rounded-md"
										/>
									</a>
								{/each}
							</div>
						</div>
					{/if}

					{#if contactLink}
						<!-- Call to action for sponsors -->
						<div class="mt-8 text-center">
							<p class="text-lg text-[#335969]">
								{t.wantToSponsor}
								<a
									href={`mailto:${contactLink}`}
									class="underline hover:text-[#477783] transition-colors">{t.getInTouch}</a
								>
							</p>
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

<!-- Gamejam Text Section -->
<div class="w-full bg-[#FCEFC5] flex justify-center py-16 relative overflow-hidden max-h-[400px]">
	<!-- Cloud backdrop for gamejam text -->
	<div class="absolute inset-0 w-full h-full pointer-events-none z-1">
		<img src="/cloud-cover-1.png" alt="" class="w-full h-full object-cover" />
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
		class="relative w-10/12 h-auto object-contain cursor-text flex flex-row max-lg:flex-wrap md:translate-y-0 max-lg:translate-y-1/5 items-center justify-center align-middle max-w-5xl z-50"
	>
		<img
			src={currentLanguage === 'en'
				? '/gamejam-1-alt.png'
				: '/jakarta/indonesian_language/gamejam-1-alt.png'}
			alt={t.howToWin}
			class="flex-shrink min-w-0 object-contain"
		/>
		<img src="/gamejam-2.png" alt={t.gameJam} class="flex-shrink min-w-0 object-contain" />
	</div>
</div>

<div
	class="flex flex-row flex-wrap w-full h-auto bg-gradient-to-b from-[#FCEFC5] to-[#FEC1CF] px-36 max-md:px-8 pb-50 max-sm:pb-24 relative"
	id="islands-container"
>
	<img src="/clouds-left-2.png" alt="" class="absolute left-0 w-3/12 top-12 pointer-events-none" />
	<img
		src="/clouds-left-3.png"
		alt=""
		class="absolute left-0 w-2/12 bottom-32 pointer-events-none"
	/>
	<img
		src="/clouds-right-2.png"
		alt=""
		class="absolute right-0 w-3/12 bottom-0 pointer-events-none"
	/>

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

	<img src="paper-airplane.png" alt="Paper airplane" class="h-16 absolute" id="paper-airplane" />

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
				<img src="paper1.png" alt="" class="w-full h-full object-contain" />
				<div
					class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center"
				>
					<span class="font-sans text-[#E472AB] font-bold text-[1.3rem] mr-1">#1:</span>
					<a href="https://daydreamjakarta.fillout.com/rsvp" class="underline">{t.step1.slice(4)}</a
					>
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
				<img src="paper2.png" alt="" class="w-full h-full object-contain" />
				<div
					class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center"
				>
					<span class="font-sans text-[#639DEB] font-bold text-[1.3rem] mr-1">#2:</span>
					{t.step2.slice(4)}
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
				<img src="paper3.png" alt="" class="w-full h-full object-contain" />
				<div
					class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center"
				>
					<span class="font-sans text-[#AB68E2] font-bold text-[1.3rem] mr-1">#3:</span>
					{t.step3.slice(4)}
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
				<img src="paper4.png" alt="" class="w-full h-full object-contain" />
				<div
					class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center"
				>
					<span class="font-sans text-[#F2993E] font-bold text-[1.3rem] mr-1">#4:</span>
					{t.step4.slice(4)}
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
				<span class="font-sans text-[#F2CC32] font-bold text-[1.5rem] mr-1">#5:</span>
				{t.step5.slice(4)}
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

<div
	class="w-full bg-gradient-to-b from-[#FDC5D1] to-[#FAE3C9] items-center justify-center px-0 md:px-8 relative pt-36"
>
	<div class="w-full max-w-5xl lg:max-w-6xl mx-auto px-2 md:px-8">
		<div class="relative w-full min-w-72">
			<img
				src="banner-city.png"
				alt={t.findDaydream}
				class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 md:-translate-y-[40%] h-48 w-auto z-100 scale-[1.15] md:scale-[1.65] saturate-70 brightness-110 object-contain px-4 pointer-events-none"
			/>

			<!-- Map container with cloudy edges -->
			<div class="relative w-full h-156 overflow-hidden bg-transparent">
				<iframe
					src={eventAddress ? '/event-map?location=' + encodeURIComponent(eventAddress) : '/map'}
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
					title="Daydream Events Map"
				>
				</iframe>
			</div>

			{#if eventAddress}
				<p class="text-center font-sans text-2xl pt-12 max-sm:text-xl text-[#60574b] z-10000">
					{#if directionsURL}
						{t.takingPlace}
						<a class="underline text-pink" href={directionsURL}>{eventAddress}</a>!
					{:else}
						{t.takingPlace} <span class="underline">{eventAddress}</span>!
					{/if}
				</p>
			{/if}
		</div>
	</div>

	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
	></div>

	<!-- Macintosh Section -->
	<div
		class="w-full flex justify-center py-16 px-8 mt-48 pb-[clamp(232px,29vw,464px)] max-sm:w-[120vw] max-sm:-translate-x-[10vw]"
	>
		<div class="bg-[#c5c2b1] p-4 relative max-w-4xl" style="border-radius: calc(1.5rem + 1rem);">
			<div
				class="bg-[#061E2D] text-[#D1E3EE] rounded-3xl py-18 md:py-16 px-10 md:px-18 relative overflow-visible"
				style="
			border-image: url('/macintosh.png') 128 91 464 91;
			border-image-slice: 128 91 464 91;
			border-image-width: clamp(64px, 8vw, 128px) clamp(45px, 6vw, 91px) clamp(232px, 29vw, 464px) clamp(45px, 6vw, 91px);
			border-image-outset: clamp(64px, 8vw, 128px) clamp(45px, 6vw, 91px) clamp(232px, 29vw, 464px) clamp(45px, 6vw, 91px);
			border-image-repeat: stretch;
			border-style: solid;
		"
			>
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
				/>

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
				/>

				<!-- Scanlines effect -->
				<div
					class="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent bg-[length:100%_6px] bg-repeat-y pointer-events-none opacity-30"
				></div>

				<!-- Rounded container -->
				<!-- Scanlines inside container -->
				<div
					class="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent bg-[length:100%_8px] bg-repeat-y pointer-events-none opacity-20"
				></div>

				<div class="space-y-8 max-sm:space-y-4 relative z-10">
					<h2 class="text-3xl md:text-4xl lg:text-5xl font-pixel leading-tight">
						{t.whatWillYou}
						<img
							src={currentLanguage === 'en'
								? '/dream-pixel.png'
								: '/jakarta/indonesian_language/dream-pixel.png'}
							alt={t.dream}
							class="h-[0.75em] font-serif italic [image-rendering:pixelated] inline align-bottom -translate-y-1.5"
						/>
					</h2>

					<p class="text-xl md:text-2xl opacity-90 font-pixel">
						{t.anyGame}
						<br />
						<br />
						{t.coolProjects}
					</p>

					<ul class="space-y-2 font-pixel text-xl md:text-2xl">
						<li class="flex items-start">
							<span class="mr-4">•</span>
							<a
								href="https://bucketfish.itch.io/remedy-renemy"
								target="_blank"
								class="underline mr-2">Remedy Renemy</a
							>by Tongyu and Kai Ling
						</li>
						<li class="flex items-start">
							<span class="mr-4">•</span>
							<a href="https://nanomars.itch.io/not-an-idle" target="_blank" class="underline mr-2"
								>Not an Idle</a
							> by Armand
						</li>
						<li class="flex items-start">
							<span class="mr-4">•</span>
							<a
								href="https://juanes10201.itch.io/speedtickers"
								target="_blank"
								class="underline mr-2">SPEEDTICKERS</a
							> by Agustin & Juan
						</li>
					</ul>

					<p class="text-xl md:text-2xl opacity-90 font-pixel leading-relaxed">
						{t.workshops}
					</p>

					<!-- Bottom section with input -->
					<div class="flex flex-col md:flex-row md:items-end gap-10 pt-8">
						<div>
							<h3 class="text-3xl md:text-4xl font-pixel mb-4">{t.stuck}</h3>
							<button
								class="bg-[#D1E3EE] text-[#061E2D] px-8 py-4 font-pixel text-xl md:text-2xl hover:bg-[#B8D3E0] cursor-pointer max-sm:w-full"
								on:click={dreamIdea}
							>
								{t.dreamIdea}
							</button>
						</div>

						<div class="flex-1">
							<div
								class="border-2 border-[#D1E3EE] p-6 min-h-40 max-h-40 w-full flex items-start overflow-y-auto idea-output-box"
							>
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

<div
	class="w-full pb-24 max-md:pt-16 bg-gradient-to-b from-[#FAE3C9] to-[#e99cce] relative flex flex-col items-center justify-center"
>
	<img src="faq-clouds.png" alt="" class="w-full" />
	<img src="faq.png" alt={t.faq} class="mb-12 h-24 scale-175 max-md:scale-120" />

	<!-- FAQ Grid -->
	<div class="grid grid-cols-2 gap-8 max-w-6xl px-8 z-10 max-[900px]:grid-cols-1 max-md:gap-16">
		<!-- FAQ Item 1 -->
		<div class="relative transform -rotate-2">
			<img
				src="window-3.png"
				alt="window"
				class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
			/>
			<div
				class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18"
			>
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">
					{t.whoCanParticipate}
				</h3>
				<p class="text-sm">
					{t.allStudents}
				</p>
			</div>
		</div>

		<!-- FAQ Item 2 -->
		<!--<div class="relative transform rotate-1">
			<img src="window-4.png" alt="window" class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">Can I organize a Daydream in my city?</h3>
				<p class="text-sm">Definitely! Contact us via daydream@hackclub.com or join #daydream on slack.</p>
			</div>
		</div>-->

		<!-- FAQ Item 3 -->
		<div class="relative transform rotate-2">
			<img
				src="window-2.png"
				alt="window"
				class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
			/>
			<div
				class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18"
			>
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">
					{t.forFree}
				</h3>
				<p class="text-sm">
					{t.yep}
				</p>
			</div>
		</div>

		<!-- FAQ Item 4 -->
		<div class="relative transform -rotate-1">
			<img
				src="window-1.png"
				alt="window"
				class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
			/>
			<div
				class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18"
			>
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">
					{t.whatDoINeed}
				</h3>
				<p class="text-sm">
					{t.need}
				</p>
			</div>
		</div>

		<!-- FAQ Item 5 -->
		<div class="relative transform rotate-1">
			<img
				src="window-4.png"
				alt="window"
				class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
			/>
			<div
				class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18"
			>
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-1 max-md:text-base">
					{t.whatHasHackClubDone}
				</h3>
				<p class="text-sm">
					{t.hackClubDone}
				</p>
			</div>
		</div>

		<!-- FAQ Item 6 -->
		<div class="relative transform rotate-1">
			<img
				src="window-3.png"
				alt="window"
				class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
			/>
			<div
				class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18"
			>
				<h3 class="text-base font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">
					{t.notGoodAtCoding}
				</h3>
				<p class="text-xs">
					{t.allSkillLevels}
				</p>
			</div>
		</div>

		<!-- FAQ Item 7 -->
		<div class="relative transform -rotate-2">
			<img
				src="window-2.png"
				alt="window"
				class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
			/>
			<div
				class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18"
			>
				<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">
					{t.parentsConcerned}
				</h3>
				<p class="text-sm">
					{t.helpParents}
				</p>
			</div>
		</div>
	</div>

	<!-- FAQ Item 8 -->
	<div class="relative transform mt-8 md:h-74 -rotate-1 scale-100">
		<img
			src="window-1.png"
			alt="window"
			class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115"
		/>
		<div
			class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70
				max-[900px]:mx-[10vw] max-sm:mx-0 max-sm:px-2 max-lg:px-6 max-xl:px-10
				max-sm:top-8 max-sm:left-4 max-sm:right-4 max-sm:bottom-8"
		>
			<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">
				{t.whatCanIMake}
			</h3>
			<p class="text-sm">
				{t.anyType}
			</p>
		</div>
	</div>

	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
	></div>
</div>

<Footer />

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
