<script lang="ts">
	// Configuration - Put your information here!
	const eventName = "Taiwan";
	const signupLink = "https://forms.hackclub.com/daydream-sign-up?event=recbXuFkkf752iPIq";
	const eventLocation = "TBD";
	const eventAddress = "";

	// These two are optional
	const directionsURL = ""
	const contactLink = "mailto:taiwan@daydream.hackclub.com"
	
	// External links for org intros
	const hackItMoreLink = "https://www.hackit.tw";
	const hackClubMoreLink = "https://hackclub.com";
	
	// Sponsors Configuration
	const sponsorsEnabled = true; // Set to false to hide the entire sponsors section
	const sponsors = [
	    { image: "/taiwan/logos/Jukebox.png", name: "Jukebox", url: "https://www.jukeboxprint.com/" },
	];

	// Partners Configuration
	const partnersEnabled = true; // Set to false to hide the entire partners section
	const partners: Array<{ name: string; url: string; image: string }> = [
		// { name: "Partner Name", url: "https://partner.example", image: "/taiwan/partner-logo.png" }
	];

	// Derived UI state for partners section
	const hasPartners = partners.length > 0;
	
	// Schedule Configuration - You don't need to use this exact schedule, this is just an example!
	const scheduleData: { title: string; items: { event: string; time: string; }[] }[] = [
		{
			title: "星期六，2025年9月27日",
			items: [
				{ event: "開始報到", time: "09:30 ~ 10:00" },
				{ event: "開幕式", time: "10:00 ~ 10:30" },
				{ event: "組隊時間", time: "10:30 ~ 11:20" },
				{ event: "入門工作彷", time: "11:20 ~ 11:50" },
				{ event: "午餐時間", time: "11:50" },
				{ event: "導師諮詢", time: "12:30 ~ 18:00" },
				{ event: "晚餐時間", time: "18:00" },
				{ event: "宵夜/夜間活動", time: "21:30" }
			]
		},
		{
			title: "星期日，2025年9月28日",
			items: [
				{ event: "早餐時間", time: "07:30" },
				{ event: "導師諮詢", time: "10:00 ~ 14:00" },
				{ event: "午餐時間", time: "13:00" },
				{ event: "展覽準備", time: "13:00 ~ 13:45" },
				{ event: "展覽/票選時間", time: "13:45 ~ 16:45" },
				{ event: "頒獎/閉幕時間", time: "16:45 ~ 17:45" }
			]
		}
	];

	
	import { onMount } from "svelte";
	import { gsap } from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import Ticker from "$lib/components/Ticker.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import ParticipantSignUp from "$lib/components/ParticipantSignUp.svelte";
	import { page } from '$app/stores';
	
	// derived selection for HackIt modal
	$: selectedHackIt = hackItActivities.find(a => a.youtubeId === selectedHackItVideoId) ?? null;
	
	
	/** @type {import('./$types').PageData} */
	export let data;
	
	// Get current URL for dynamic metadata
	$: currentUrl = `https://daydream.hackclub.com${$page.url.pathname}`;
	$: pageTitle = `Daydream ${eventName}`;
	$: pageDescription = `加入由 Hack Club 舉辦的全球青少年黑客松 Daydream 活動！一場由青少年主導的遊戲黑客松，和其他青少年一起在 32 小時做出你人生的第一個遊戲。提供免費餐點、入門工作坊與獎品！`;
	$: pageKeywords = `game jam, 遊戲創作, hackathon, 黑客松, 青少年程式, Hack Club, HackIt, 遊戲開發, ${eventLocation}, ${eventName}`;

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
Taiwan
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




	// Hack Club activities modal state
	let showActivitiesPopup = false;
	let selectedVideoId: string | null = null;
	// HackIt activities modal state
	let showHackItPopup = false;
	let selectedHackItVideoId: string | null = null;

	// Featured Hack Club activities with videos
	const hackClubActivities: Array<{ title: string; youtubeId: string }> = [
		{ title: "在美國 GitHub 總部舉辦全球最大的跨國青少年硬體黑客松", youtubeId: "kaEFv7e49mo" },
		{ title: "太平洋山脊步道七天徒步：來自九國的 30 名青少年一起設計客製化 PCB", youtubeId: "ufMUJ9D1fi8" },
		{ title: "兩個月遊戲開發，並在上海舉辦七天的遊戲展示咖啡館", youtubeId: "SiDWvGPl0z0" },
		{ title: "全球最長的黑客松：在橫跨美國的火車上舉行", youtubeId: "2BID8_pGuqA" }
	];

	// Featured HackIt activities with videos and descriptions
	const hackItActivities: Array<{ title: string; youtubeId: string; description: string }> = [
		{
			title: "Scrapyard Taiwan",
			youtubeId: "v1i74QsB7xk",
			description:
				"由 Hack Club 在全球各地發起的 Scrapyard 黑客松活動，在台灣由 HackIt 於 2025 年 3/15、3/16 在三民高中舉辦兩天一夜的跨夜黑客松，主題是 'Build Stupid Thing, Get Stupid Thing'。這 32 小時，我們一起衝刺、熬夜、發瘋，從零到一把腦中的點子變成真實作品。影片記錄的不只是畫面，而是屬於我們的勇氣、汗水和笑聲。指導單位：新北市政府教育局；主辦單位：HackIt；協辦單位：Hack Club、台灣微課程發展協會、新北市立三民高級中學。"
		},
		{
			title: "第五屆中學生黑客松子賽事",
			youtubeId: "kCxiyOSYkwk",
			description:
				"（HackIt 協助舉辦）國教署、高雄市教育局、高雄女中、台灣微課程發展協會、台灣微軟共同舉辦，HackIt 協助辦理。活動於 2025 年 7 月 18、19 日在高雄女中舉行兩天一夜的跨夜黑客松。指導單位：教育部國民及學前教育署、高雄市政府教育局、新興科技教育遠距示範服務計畫辦公室；主辦單位：高雄市立高雄女子高級中學；協辦單位：Microsoft 微軟、台灣微課程發展協會。"
		}
	];

	// More projects/initiatives
	const moreHackClubProjects: Array<{ name: string; url: string }> = [
		{ name: "Neighborhood", url: "https://neighborhood.hackclub.com/" },
		{ name: "Shipwrecked", url: "https://shipwrecked.hackclub.com/" },
		{ name: "Highway / Undercity", url: "https://highway.hackclub.com/" },
		{ name: "Juice", url: "https://juice.hackclub.com/" },
		{ name: "High Seas", url: "https://highseas.hackclub.com/" },
		{ name: "Hackpad", url: "https://hackpad.hackclub.com/" },
		{ name: "Black Box", url: "https://blackbox.hackclub.com/" },
		{ name: "Say Cheese", url: "https://saycheese.hackclub.com/" },
		{ name: "Retrospect", url: "https://retrospect.hackclub.com/" },
		{ name: "Cider", url: "https://cider.hackclub.com/" },
		{ name: "Infill", url: "https://infill.hackclub.com/" },
		{ name: "Scrapyard", url: "https://scrapyard.hackclub.com/" },
		{ name: "TerminalCraft", url: "https://terminalcraft.hackclub.dev/" },
		{ name: "Counterspell", url: "https://counterspell.hackclub.com/" },
		{ name: "The Trail", url: "https://www.youtube.com/watch?v=ufMUJ9D1fi8" },
		{ name: "Arcade", url: "https://hackclub.com/arcade/" },
		{ name: "Boreal Express", url: "https://boreal.hackclub.com/" },
		{ name: "OnBoard", url: "https://hackclub.com/onboard/" }
	];
	
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

	function openActivitiesPopup() {
		selectedVideoId = hackClubActivities[0]?.youtubeId ?? null;
		showActivitiesPopup = true;
	}

	function closeActivitiesPopup() {
		showActivitiesPopup = false;
	}

	function openHackItPopup() {
		selectedHackItVideoId = hackItActivities[0]?.youtubeId ?? null;
		showHackItPopup = true;
	}

	function closeHackItPopup() {
		showHackItPopup = false;
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
						return "來試試在漂浮小島上收集魔法水晶、一步步解鎖新地圖的小冒險遊戲！";
					}
				}
				
				const data = await response.json();
				const englishIdea: string = data.idea;

                // Translate to Traditional Chinese directly via external API (client-side)
                try {
                    const systemPrompt =
                        'You are a strict translator to Traditional Chinese (Taiwan).\n' +
                        '- Output ONLY the translation in Traditional Chinese, no explanations.\n' +
                        '- Preserve meaning and keep it concise as one sentence.\n' +
                        '- Keep game terms simple and beginner-friendly.\n' +
                        '- Do not add punctuation or emojis beyond what is natural.\n' +
                        '- If input is already Traditional Chinese, return it unchanged.';

                    const userPrompt = `Translate the following to Traditional Chinese (Taiwan).\n\nText:\n\"\"\"${englishIdea}\"\"\"`;

                    const aiRes = await fetch('https://ai.hackclub.com/chat/completions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            messages: [
                                { role: 'system', content: systemPrompt },
                                { role: 'user', content: userPrompt }
                            ]
                        })
                    });

                    if (aiRes.ok) {
                        const aiData = await aiRes.json();
                        let translated: string = aiData.choices?.[0]?.message?.content?.trim() ?? '';
                        // Cleanup any hidden tags or quotes
                        translated = translated.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
                        translated = translated.replace(/^\s*["]|["]\s*$/g, '').trim();
                        translated = translated.replace(/^\s*[']|[']\s*$/g, '').trim();
                        if (translated) {
                            return translated;
                        }
                    }
                } catch (e) {
                    // Ignore translation errors, will fallback below
                }

				// As a last resort, return the English idea (better than nothing)
				return englishIdea;
			} catch (error) {
				attempt++;
				console.warn(`Attempt ${attempt} failed:`, error);
				
				if (attempt >= maxAttempts) {
					return "來試試在漂浮小島上收集魔法水晶、一步步解鎖新地圖的小冒險遊戲！";
				}
				
				// Wait before retrying
				await new Promise(resolve => setTimeout(resolve, 1000));
			}
		}
		
		return "來試試在漂浮小島上收集魔法水晶、一步步解鎖新地圖的小冒險遊戲！";
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
		/* 中文字體優化 */
		font-family: 
			-apple-system, BlinkMacSystemFont, 
			"PingFang TC", "Microsoft JhengHei", "Noto Sans TC", 
			"Source Han Sans TC", "Apple LiGothic Medium", 
			"Helvetica Neue", Helvetica, Arial, sans-serif;
		/* 中文行高優化 */
		line-height: 1.7;
		/* 中文字體渲染優化 */
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
	}
	:global(html) {
		overflow-x: hidden;
	}
	
	/* 中文字體全域設定 */
	:global(.font-serif) {
		font-family: 
			"Source Han Serif TC", "Noto Serif TC", 
			"PingFang TC", "Microsoft JhengHei", 
			Georgia, "Times New Roman", serif !important;
		line-height: 1.8 !important;
	}
	
	:global(.font-sans) {
		font-family: 
			-apple-system, BlinkMacSystemFont, 
			"PingFang TC", "Microsoft JhengHei", "Noto Sans TC", 
			"Source Han Sans TC", "Apple LiGothic Medium", 
			"Helvetica Neue", Helvetica, Arial, sans-serif !important;
		line-height: 1.7 !important;
	}
	
	/* 中文標題優化 */
	:global(h1, h2, h3, h4, h5, h6) {
		font-family: 
			"Source Han Serif TC", "Noto Serif TC", 
			"PingFang TC", "Microsoft JhengHei", 
			Georgia, "Times New Roman", serif !important;
		line-height: 1.6 !important;
		letter-spacing: 0.02em;
		font-weight: 600;
	}
	
	/* 中文段落優化 */
	:global(p) {
		line-height: 1.8 !important;
		letter-spacing: 0.02em;
		word-break: break-word;
		overflow-wrap: break-word;
	}
	
	/* 中文按鈕文字優化 */
	:global(button) {
		font-family: 
			-apple-system, BlinkMacSystemFont, 
			"PingFang TC", "Microsoft JhengHei", "Noto Sans TC", 
			"Source Han Sans TC", "Apple LiGothic Medium", 
			"Helvetica Neue", Helvetica, Arial, sans-serif !important;
		letter-spacing: 0.05em;
		font-weight: 500;
	}
	
	/* 中文連結優化 */
	:global(a) {
		text-decoration-thickness: 2px;
		text-underline-offset: 3px;
	}
	
	/* 中文清單項目優化 */
	:global(li) {
		line-height: 1.8 !important;
		margin-bottom: 0.5rem;
	}
	
	/* 像素字體保持原樣 */
	:global(.font-pixel) {
		font-family: monospace !important;
		line-height: 1.5 !important;
		letter-spacing: 0.1em;
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
	<div class="absolute inset-0 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-30 pointer-events-none z-0"></div>

	<!-- Cloudy Background -->
	<div class="cloudy-bg-parallax absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[80vh] bg-[url(/cloudy-bg.png)] opacity-30 bg-cover bg-no-repeat bg-top pointer-events-none"></div>

	<div class="buildings-back-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-back.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"></div>
	
	<Ticker {tickerText} />
	
	<!-- brush texture clipped to back buildings -->
	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat pointer-events-none opacity-100 lg:-translate-y-15 bg-center mix-blend-overlay" style="mask-image: url('/buildings-back.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center top; -webkit-mask-image: url('/buildings-back.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center top;"></div>
	
	<div class="buildings-front-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-front.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"></div>
	<!-- brush texture clipped to front buildings -->
	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat pointer-events-none opacity-100 lg:-translate-y-15 bg-center mix-blend-overlay" style="mask-image: url('/buildings-front.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center top; -webkit-mask-image: url('/buildings-front.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center top;"></div>
	<div class="hero-ui-parallax flex flex-col items-center justify-center text-center relative z-30 -translate-y-2">
		<div class="inline-block relative">
			<div class="h-12"></div> 
			<!-- space for the ship -->
			<h2
			class="text-xl font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent absolute left-1/2 max-sm:translate-y-4 max-sm:mb-0 max-md:-mb-8 md:left-[calc(50%+4rem)] -translate-x-1/2 bottom-8 w-max md:text-lg max-sm:text-lg tracking-wide"
			>
				2025年9月27日 & 28日
			</h2>
			<img src="daydream.png" alt="Daydream" class="h-40 mb-6 w-auto object-contain max-w-full px-4" />
			<a href="https://hackclub.com" class="absolute top-0 -right-6 max-sm:right-0 max-sm:scale-80 animate-hover ![animation-delay:0.9s] ![--hover:-0.2rem]">
				<img src="flag-plane.png" alt="Hack Club" class="h-28">
			</a>
		</div>
		<div class="relative inline-block px-4">
			<h3
				class="text-3xl font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent w-max max-sm:text-2xl mx-auto tracking-wide font-semibold"
			>
				兩天，築一場遊戲的夢
			</h3>
			<img
				src="underline.svg"
				alt=""
				class="absolute left-1/2 -translate-x-1/2 -mt-1 h-auto scale-11	5"
			/>
			<h4
				class="text-xl md:text-2xl opacity-90 mt-4 font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent max-sm:text-base tracking-wide leading-relaxed max-sm:leading-normal break-words whitespace-normal text-center"
			>
				青少年組織，為青少年舉辦的遊戲黑客松<br>
				在{@html eventLocation.replaceAll(" ", "&nbsp;")}舉行
			</h4>
		</div>
		
		<ParticipantSignUp {signupLink} {eventName} />
		<div class="mt-4">
			<a
				href="https://go.hackit.tw/daydream-taiwan-guild"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-block px-6 py-3 max-sm:px-4 max-sm:py-2 max-sm:text-sm bg-[#D1E3EE] border-b-4 border-[#B8D3E0] text-[#061E2D] rounded-full 
					font-sans font-medium tracking-wide max-sm:tracking-normal transform hover:-translate-y-1 hover:shadow-lg 
					active:translate-y-0 active:border-b-2 transition-all duration-150"
			>
				了解更多
			</a>
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
	
	<img src="/clouds-top-middle.png" alt="" class="absolute left-5/12 -translate-x-1/2 w-7/12 -bottom-24 z-20 pointer-events-none">
	<img src="/clouds-top-right.png" alt="" class="absolute right-0 w-1/2 -bottom-12 translate-y-1/2 z-20 pointer-events-none">
	<img src="/clouds-top-left.png" alt="" class="absolute left-0 w-3/12 -bottom-12  translate-y-1/2 z-20 pointer-events-none">
	

	<!-- Desktop stickers button (bottom left) -->
	<a
		href="https://forms.hackclub.com/daydream-stickers"
		target="_blank"
		class="hidden md:block absolute bottom-16 left-16 z-50 w-max px-4 py-2 bg-pink border-b-2 border-b-pink-dark text-white rounded-full active:transform active:translate-y-0.5 transition-all duration-100 font-sans cursor-pointer overflow-visible hover:shadow-[0_2px_0_0_theme(colors.pink.dark)] hover:-translate-y-[2px] active:border-transparent active:shadow-none tracking-wide font-medium"
	>
		拿免費貼紙
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
		<div class="relative z-20 px-12 md:px-20 max-sm:px-6 pt-20 pb-52 rounded-lg mb-0" style="background-image: url('/letter-top.png'), linear-gradient(to bottom, #FCEFC5 100px, transparent 100px), url('/letter-loop.png'); background-size: 100% auto, 100% auto, 100% auto; background-repeat: no-repeat, no-repeat, repeat-y; background-position: top, top, top; background-attachment: local, local, local;">
			<div class="absolute bottom-0 left-0 w-full h-24 z-10 pointer-events-none bg-[url('/clouds-loop.png')] bg-repeat-x bg-bottom bg-contain"></div>
			<h2 class="text-3xl md:text-4xl lg:text-5xl max-sm:text-2xl font-serif text-[#8B4513] mb-12 relative tracking-wide leading-tight font-semibold break-words">
				親愛的駭客、創作者和藝術家們，
				<img src="/underline.svg" alt="" class="absolute left-0 -bottom-3 w-full max-w-md h-auto opacity-70">
			</h2>
			
			<div class="text-[#8B4513] font-serif text-base md:text-xl leading-loose space-y-6 tracking-wide max-sm:tracking-normal">
				<p class="leading-loose">嘿，歡迎加入 Hack Club 的全新冒險！今年秋天，我們誠摯地邀請你一起參加 Daydream——一場在全球 100 座城市同時展開、熱鬧又瘋狂的遊戲創作派對。</p>

				<p class="font-bold text-lg md:text-2xl leading-loose tracking-wider max-sm:tracking-normal">這個秋天，我們想親眼看見你做出屬於自己的遊戲。</p>

				<p class="leading-loose">還沒做過遊戲也沒關係。我們準備了線上與實體的工作坊，會從零開始一步步陪你上手，把腦中的點子變成能玩的作品。</p>

				<p class="leading-loose">在這裡，你會學到新技能、做出讓自己驕傲的作品、遇見一起熬夜偷笑的夥伴，最後把成果分享給全世界。</p>

				<p class="leading-loose">期待在 Daydream 和你見面。</p>

				<p class="mb-2 leading-loose">滿懷熱忱，</p>

				<p class="text-xl md:text-2xl opacity-85 leading-loose">Hack Club 總部 Augie 與 Renran 敬上</p>
			</div>
		</div>
	</div>

	<div class="w-full absolute z-30 max-h-64 bottom-0 max-2xl:translate-y-1/4 max-lg:translate-y-1/2 pointer-events-none">	
		<img src="/cloud-cover-1.png" alt="" class="w-full h-full object-contain min-[2048px]:hidden">
	</div>

</div>

<!-- Orgs Intro Section: HackIt & Hack Club -->
<div class="w-full bg-gradient-to-b from-[#FCEFC5] via-[#FAE3C9] to-[#FCEFC5] relative py-20 px-8 -mb-8">
    <!-- Background texture -->
    <div class="absolute inset-0 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-30 pointer-events-none"></div>
    <!-- Top soft fade to remove hard seam under previous billboard -->
    <div class="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#FCEFC5] to-transparent pointer-events-none z-10"></div>
    
    <!-- Decorative clouds -->
    <img src="/clouds-left-2.png" alt="" class="absolute left-0 w-2/12 top-12 pointer-events-none opacity-60 z-0">
    <img src="/clouds-right-2.png" alt="" class="absolute right-0 w-2/12 bottom-12 pointer-events-none opacity-60 z-0">
    
    <!-- Bottom transition clouds -->
    <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FCEFC5] to-transparent pointer-events-none z-0"></div>

    <div class="w-full max-w-6xl mx-auto relative z-30">
        <!-- Section Header -->
        <div class="text-center mb-16">
            <div class="relative inline-block px-4">
                <h2 class="text-4xl md:text-5xl font-serif font-semibold bg-gradient-to-b from-[#8B4513] to-[#6E3D15] bg-clip-text text-transparent mb-3 tracking-wide">
                        主辦團隊是誰？
                </h2>
                <img src="/underline.svg" alt="" class="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full max-w-sm h-auto opacity-80">
                <p class="text-lg md:text-xl font-serif text-[#705e4f] mt-6 opacity-85 tracking-wide leading-relaxed">
                        由台灣青少年團隊 HackIt 與全球社群 Hack Club 共同主辦
                </p>
            </div>
        </div>

        <!-- Cards Container -->
        <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-center">
            
            <!-- HackIt Card -->
            <div class="relative max-w-lg w-full">
                <!-- Paper Background -->
                <div class="relative bg-[#FEFDF8] rounded-2xl border-4 border-[#E8E1D0] shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <div class="p-8 md:p-10">
                        <!-- Header with Logo Space -->
                        <div class="text-center mb-6">
                            <div class="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-3xl bg-white/95 ring-1 ring-[#E8E1D0] shadow-sm overflow-hidden p-1">
                                <img src="/taiwan/hackIt_logo.png" alt="HackIt logo" class="h-full w-full object-contain rounded-3xl" />
                            </div>
                            <h3 class="text-2xl md:text-3xl font-serif font-bold text-[#335969] tracking-wide">
                                HackIt
                            </h3>
                            <p class="text-sm text-[#60574b] opacity-70">台灣青少年創意程式社群</p>
                        </div>

                        <!-- Description -->
                        <p class="text-base text-[#60574b] leading-relaxed tracking-wide text-center mb-6">
							HackIt 是台灣首個由青少年主導的創造型社群：我們自己辦活動、自己寫程式、自己改變世界。拒絕填鴨、拒絕等待，讓每一位青少年，親手打造屬於自己的未來。
                        </p>

                        <!-- Photos Grid -->
                        <div class="grid grid-cols-3 gap-3 mb-6">
                            <div class="relative group aspect-square bg-white rounded-lg overflow-hidden border-2 border-[#E8E1D0]">
                                <img src="/taiwan/scrapyard_taiwan_all.jpg" alt="Scrapyard Taiwan 大合照" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-[#061E2D]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2">
                                    <p class="text-[9px] text-[#D1E3EE] leading-[1.05]">
                                        攝影：劉研軾<br>活動：Scrapyard Taiwan
                                    </p>
                                </div>
                            </div>
                            <div class="relative group aspect-square bg-white rounded-lg overflow-hidden border-2 border-[#E8E1D0]">
                                <img src="/taiwan/scrapyard_photo.jpg" alt="Scrapyard Taiwan 現場" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-[#061E2D]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2">
                                    <p class="text-[9px] text-[#D1E3EE] leading-[1.05]">
                                        攝影：劉研軾<br>活動：Scrapyard Taiwan
                                    </p>
                                </div>
                            </div>
                            <div class="relative group aspect-square bg-white rounded-lg overflow-hidden border-2 border-[#E8E1D0]">
                                <img src="/taiwan/hsh_5th.jpg" alt="第五屆中學生黑客松子賽事大合照" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-[#061E2D]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2">
                                    <p class="text-[9px] text-[#D1E3EE] leading-[1.05]">
                                        來源：高雄市教育局<br>活動：第五屆中學生黑客松子賽事
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- CTA Button -->
                        <div class="text-center flex flex-col sm:flex-row gap-3 justify-center">
                            <a href={hackItMoreLink} target="_blank" rel="noopener noreferrer"
                               class="inline-block px-6 py-3 max-sm:px-4 max-sm:py-2 max-sm:text-sm bg-pink border-b-4 border-pink-dark text-white rounded-full 
                                      font-sans font-medium tracking-wide max-sm:tracking-normal transform hover:-translate-y-1 hover:shadow-lg 
                                      active:translate-y-0 active:border-b-2 transition-all duration-150">
                                了解更多 HackIt
                            </a>
                            <button
                               class="inline-block px-6 py-3 max-sm:px-4 max-sm:py-2 max-sm:text-sm bg-[#D1E3EE] border-b-4 border-[#B8D3E0] text-[#061E2D] rounded-full 
                                      font-sans font-medium tracking-wide max-sm:tracking-normal transform hover:-translate-y-1 hover:shadow-lg 
                                      active:translate-y-0 active:border-b-2 transition-all duration-150"
                               on:click={openHackItPopup}
                            >
                                ▶ 查看過去成果
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hack Club Card -->
            <div class="relative max-w-lg w-full">
                <!-- Paper Background -->
                <div class="relative bg-[#FEFDF8] rounded-2xl border-4 border-[#E8E1D0] shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
                    <div class="p-8 md:p-10">
                        <!-- Header with Logo Space -->
                        <div class="text-center mb-6">
                            <div class="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-3xl bg-white/95 ring-1 ring-[#E8E1D0] shadow-sm overflow-hidden p-1">
                                <img src="/taiwan/hackclub_logo.png" alt="Hack Club logo" class="h-full w-full object-contain rounded-3xl" />
                            </div>
                            <h3 class="text-2xl md:text-3xl font-serif font-bold text-[#335969] tracking-wide">
                                Hack Club
                            </h3>
                            <p class="text-sm text-[#60574b] opacity-70">全球青少年開源社群</p>
                        </div>

                        <!-- Description -->
                        <p class="text-base text-[#60574b] leading-relaxed tracking-wide text-center mb-6">
                            全球最大的青少年程式社群，在世界各地幫助學生舉辦黑客松、動手做專案。並提供資金補助與指導，讓你從零開始學會寫程式、做出真正的作品。
                        </p>

                        <!-- Photos Grid -->
                        <!-- Photos Grid -->
                        <div class="grid grid-cols-3 gap-3 mb-6">
                            <div class="relative group aspect-square bg-white rounded-lg overflow-hidden border-2 border-[#E8E1D0]">
                                <img src="/taiwan/juice_all.JPG" alt="Juice 活動現場" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-[#061E2D]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2">
                                    <p class="text-[9px] text-[#D1E3EE] leading-[1.05]">
                                        攝影：Paolo<br>活動：Juice
                                    </p>
                                </div>
                            </div>
                            <div class="relative group aspect-square bg-white rounded-lg overflow-hidden border-2 border-[#E8E1D0]">
                                <img src="/taiwan/juice_mt.png" alt="Juice 活動現場" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-[#061E2D]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2">
                                    <p class="text-[9px] text-[#D1E3EE] leading-[1.05]">
                                        攝影：Yao<br>活動：Juice
                                    </p>
                                </div>
                            </div>
                            <div class="relative group aspect-square bg-white rounded-lg overflow-hidden border-2 border-[#E8E1D0]">
                                <img src="/taiwan/juice_birthday.JPG" alt="Juice 活動現場" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-[#061E2D]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2">
                                    <p class="text-[9px] text-[#D1E3EE] leading-[1.05]">
                                        攝影：Paolo<br>活動：Juice
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- CTA Buttons -->
                        <div class="flex flex-col sm:flex-row gap-3 justify-center">
                            <a href={hackClubMoreLink} target="_blank" rel="noopener noreferrer"
                               class="inline-block px-6 py-3 max-sm:px-4 max-sm:py-2 max-sm:text-sm bg-[#639DEB] border-b-4 border-[#335969] text-white rounded-full 
                                      font-sans font-medium tracking-wide max-sm:tracking-normal transform hover:-translate-y-1 hover:shadow-lg 
                                      active:translate-y-0 active:border-b-2 transition-all duration-150 text-center">
                                了解更多
                            </a>
                            <button
                               class="inline-block px-6 py-3 max-sm:px-4 max-sm:py-2 max-sm:text-sm bg-[#D1E3EE] border-b-4 border-[#B8D3E0] text-[#061E2D] rounded-full 
                                      font-sans font-medium tracking-wide max-sm:tracking-normal transform hover:-translate-y-1 hover:shadow-lg 
                                      active:translate-y-0 active:border-b-2 transition-all duration-150"
                               on:click={openActivitiesPopup}
                            >
                                ▶ 查看過去活動
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{#if partnersEnabled}
<!-- Partners Section (cleaned) -->
<div class={`w-full relative ${hasPartners ? 'py-16 md:py-20' : 'py-12'} px-6 md:px-8 bg-[#FCEFC5] overflow-hidden`}>
    <!-- Subtle paper texture only -->
    <div class="absolute inset-0 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat opacity-20 mix-blend-overlay pointer-events-none"></div>
    <!-- Soft top fade for seam -->
    <div class="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-[#FCEFC5] to-transparent pointer-events-none"></div>

    <div class="w-full max-w-6xl mx-auto relative z-10">
        <!-- Section Header -->
        <div class="text-center {hasPartners ? 'mb-8 md:mb-10' : 'mb-4'}">
            <div class="relative inline-block px-2">
                <h2 class="text-[2rem] md:text-4xl font-serif font-semibold bg-gradient-to-b from-[#8B4513] to-[#6E3D15] bg-clip-text text-transparent tracking-wide">
                    合作夥伴
                </h2>
                <img src="/underline.svg" alt="" class="absolute left-1/2 -translate-x-1/2 -bottom-2 w-44 md:w-56 h-auto opacity-80" />
                <p class="text-sm md:text-base font-serif text-[#705e4f] mt-6 opacity-85 tracking-wide leading-relaxed">
                    和我們一起，讓 Daydream {eventName} 發生
                </p>
            </div>
        </div>

        {#if hasPartners}
            <!-- Partners Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center">
                {#each partners as partner}
                    <a href={partner.url} target="_blank" rel="noopener noreferrer"
                       class="group w-full h-16 sm:h-20 md:h-24 bg-white/70 hover:bg-white transition-colors rounded-xl border border-[#E8E1D0] flex items-center justify-center p-3 shadow-[0_1px_0_rgba(0,0,0,0.05)] hover:shadow-md">
                        <img src={partner.image} alt={partner.name} class="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200 grayscale group-hover:grayscale-0" />
                    </a>
                {/each}
            </div>
        {/if}

        {#if contactLink}
            <div class="{hasPartners ? 'mt-10' : 'mt-4'} text-center">
                <p class="text-base md:text-lg text-[#335969]">
                    想與 Daydream {eventName} 合作？
                    <a href={contactLink} class="underline hover:text-[#477783] transition-colors">來信洽談</a>
                </p>
            </div>
        {/if}
    </div>

    <!-- Soft bottom fade to next section -->
    <div class="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-[#FCEFC5] to-transparent pointer-events-none"></div>
</div>
{/if}


<!-- HackIt Activities Modal -->
{#if showHackItPopup}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-70 flex items-center justify-center z-[12001]"
		on:click={closeHackItPopup}
		on:keydown={(e) => e.key === 'Escape' && closeHackItPopup()}
		role="dialog"
		aria-modal="true"
		aria-label="HackIt Activities"
		tabindex="-1"
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative w-[92vw] max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden bg-[#FEFDF8] rounded-2xl border-4 border-[#E8E1D0] shadow-xl"
			on:click|stopPropagation
		>
			<button
				class="cursor-pointer absolute top-2 right-2 md:top-3 md:right-3 z-20 w-8 h-8 bg-white/80 md:bg-white/20 hover:bg-white/90 md:hover:bg-white/30 rounded-full flex items-center justify-center text-[#335969] md:text-white text-xl font-bold transition-colors duration-200"
				on:click={closeHackItPopup}
				aria-label="Close activities"
			>
				<span class="-translate-y-0.5">×</span>
			</button>
			<!-- Subtle paper texture overlay -->
			<div class="absolute inset-0 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat opacity-15 pointer-events-none"></div>
			<!-- Header -->
			<div class="px-6 md:px-8 py-4 bg-[#F7F2E3] border-b-2 border-[#E8E1D0] relative">
				<h3 class="text-xl md:text-2xl font-serif font-bold text-[#335969] text-center tracking-wide">HackIt 過去的活動</h3>
				<img src="/underline.svg" alt="" class="absolute left-1/2 -translate-x-1/2 -bottom-2 w-40 h-auto opacity-60" />
			</div>

			<!-- Content -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-0 relative overflow-x-hidden bg-[#F7F2E3]">
				<!-- Activities list -->
				<div class="lg:col-span-1 p-5 md:p-6 bg-white/60 border-r-2 border-[#E8E1D0]">
					<ul class="space-y-3">
						{#each hackItActivities as act}
							<li>
								<button
									class="w-full text-left px-4 py-3 rounded-xl bg-white hover:bg-[#F7F2E3] border-2 border-[#E8E1D0] transition-colors tracking-wide text-[#335969]"
									on:click={() => selectedHackItVideoId = act.youtubeId}
								>
									{act.title}
								</button>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Video player + description -->
				<div class="lg:col-span-2 p-4 md:p-6 bg-[#F7F2E3]">
					<div class="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-[#E8E1D0] shadow-lg bg-black">
						{#if selectedHackItVideoId}
							<iframe
								src={`https://www.youtube.com/embed/${selectedHackItVideoId}?autoplay=1`}
								title="HackIt activity video"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowfullscreen
								class="w-full h-full"
							></iframe>
						{:else}
							<div class="w-full h-full flex items-center justify-center text-white/80 font-sans">選擇左側活動以播放影片</div>
						{/if}
					</div>

					<!-- Description -->
					{#if selectedHackIt}
						<div class="mt-6 pt-4 border-t border-[#E8E1D0]">
							<h4 class="text-[#335969] font-sans font-medium mb-2">活動介紹</h4>
							<p class="text-[#335969]/90 leading-relaxed tracking-wide">{selectedHackIt.description}</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Schedule Container -->
<div class="w-full bg-[#FCEFC5] pt-24 pb-16 px-8 flex justify-center">
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
					活動時程
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
							<h3 class="text-xl md:text-2xl font-sans font-bold text-[#335969] mb-6 text-center px-8 max-sm:text-base max-sm:px-4 tracking-wide max-sm:tracking-normal">
								{day.title}
							</h3>
							
							<div class="max-w-xl mx-auto px-4 max-sm:px-2">
								{#each day.items as item, index}
									<div class="flex items-center justify-between py-3 max-sm:py-2 max-sm:flex-col max-sm:gap-1">
										<span class="text-base md:text-lg max-sm:text-sm font-sans text-[#477783] tracking-wide max-sm:tracking-normal max-sm:text-center">{item.event}</span>
										<span class="text-base md:text-lg max-sm:text-xs font-sans text-[#477783] tracking-wide max-sm:tracking-normal max-sm:opacity-75">{item.time}</span>
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
					贊助商
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
								<div class="grid gap-8 items-center justify-items-center max-w-4xl {sponsors.length === 1 ? 'grid-cols-1' : sponsors.length === 2 ? 'grid-cols-1 md:grid-cols-2' : sponsors.length === 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}">
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
							<p class="text-lg text-[#335969]">想贊助 Daydream {eventName}？<a href={contactLink} class="underline hover:text-[#477783] transition-colors">來信洽談</a></p>
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
<div class="w-full bg-[#FCEFC5] flex justify-center py-16 relative overflow-visible">
	<!-- Cloud backdrop for gamejam text -->
	<div class="absolute inset-0 w-full h-full pointer-events-none z-1">	
		<img src="/cloud-cover-1.png" alt="" class="w-full h-full object-cover">
				<div class="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2" data-point="0"></div>
		<div class="absolute top-1/2 left-1/4 w-1 h-1 -translate-x-1/2 -translate-y-1/2" data-point="0.5"></div>
	</div>
	<!-- Top fade to avoid banding between sections -->
	<div class="absolute top-0 left-0 w-full h-14 bg-gradient-to-b from-[#FCEFC5] to-transparent pointer-events-none z-10"></div>
	
	<div class="relative w-10/12 h-auto cursor-text flex items-center justify-center text-center md:translate-y-0 max-lg:translate-y-1/5 max-w-5xl z-50">
		<h2 class="text-4xl md:text-5xl lg:text-6xl font-serif tracking-wide leading-tight">
			<span class="bg-gradient-to-b from-[#8B4513] to-[#6E3D15] bg-clip-text text-transparent">這樣贏下一場</span>
			<span class="mx-2 bg-gradient-to-b from-[#E472AB] to-[#DB5DA2] bg-clip-text text-transparent">Game Jam</span>
		</h2>
	</div>
</div>

<div class="flex flex-row flex-wrap w-full h-auto bg-gradient-to-b from-[#FCEFC5] to-[#FEC1CF] px-36 max-md:px-8 pb-50 max-sm:pb-24 relative" id="islands-container">

	<img src="/clouds-left-2.png" alt="" class="absolute left-0 w-3/12 top-12 pointer-events-none z-0">
	<img src="/clouds-left-3.png" alt="" class="absolute left-0 w-2/12 bottom-32 pointer-events-none">
	<img src="/clouds-right-2.png" alt="" class="absolute right-0 w-3/12 bottom-0 pointer-events-none z-0">

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
					<span class="font-sans text-[#E472AB] font-bold text-[1.3rem] mr-1">#1:</span> <a href={signupLink} class="underline">報名</a> Daydream {eventName}
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
				<div class="absolute inset-0 justify-center text-center p-6 text-lg md:text-xl font-serif max-md:text-base max-sm:text-sm text-[#8B4513] inline-block content-center leading-relaxed tracking-wide max-sm:tracking-normal max-sm:p-4">
											<span class="font-sans text-[#639DEB] font-bold text-xl md:text-[1.3rem] max-sm:text-lg mr-1">#2:</span> 參加工作坊，學習遊戲開發
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
				<div class="absolute inset-0 justify-center text-center p-6 text-lg md:text-xl font-serif max-md:text-base max-sm:text-sm text-[#8B4513] inline-block content-center leading-relaxed tracking-wide max-sm:tracking-normal max-sm:p-4">
											<span class="font-sans text-[#AB68E2] font-bold text-xl md:text-[1.3rem] max-sm:text-lg mr-1">#3:</span> 在現場和其他同學組隊
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
				<div class="absolute inset-0 justify-center text-center p-6 text-lg md:text-xl font-serif max-md:text-base max-sm:text-sm text-[#8B4513] inline-block content-center leading-relaxed tracking-wide max-sm:tracking-normal max-sm:p-4">
											<span class="font-sans text-[#F2993E] font-bold text-xl md:text-[1.3rem] max-sm:text-lg mr-1">#4:</span> 開始動手做遊戲——<em>不需任何經驗</em>
				</div>
			</div>
		</div>
		<img src="/island-4.png" alt="" class="w-88 h-88 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:0.5s] z-0">
	</div>

	<!-- Final Card -->
	<div class="flex flex-col items-center w-full basis-full translate-y-40 max-md:translate-y-12 z-20">
		<div class="relative">
			<div class="bg-[url('/card-final.png')] bg-contain bg-no-repeat bg-center text-xl md:text-2xl font-serif pt-24 px-8 w-128 h-96 text-center max-md:w-80 max-md:h-80 max-md:text-lg max-sm:text-base max-md:pt-16 max-sm:pt-12 max-sm:px-6 animate-hover ![--hover:-0.15rem] ![animation-delay:1.9s] leading-relaxed tracking-wide max-sm:tracking-normal" data-point="5">
										<span class="font-sans text-[#F2CC32] font-bold text-2xl md:text-[1.5rem] max-sm:text-xl mr-1">#5:</span> 把你的作品分享給全世界！
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
						{eventName} 將在 <a class="underline text-pink" href={directionsURL}>{eventAddress}</a> 舉行！
					{:else}
						{eventName} 將在 <span class="underline">{eventAddress}</span> 舉行！
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
					<h2 class="text-4xl md:text-5xl lg:text-6xl max-sm:text-2xl font-pixel leading-tight tracking-wider max-sm:tracking-normal max-sm:leading-relaxed md:whitespace-nowrap">
						你想<img src="/taiwan/dream-pixel.png" alt="Dream" class="h-[0.75em] font-serif italic [image-rendering:pixelated] inline align-middle -translate-y-1.5 mx-[0.1em]">出什麼遊戲？
					</h2>
					
					<p class="text-lg md:text-xl max-sm:text-base opacity-90 font-pixel leading-loose tracking-wide max-sm:tracking-normal">
						只要能發佈在 itch.io 上，想做什麼遊戲都可以！作品需要上架，讓大家能在線上體驗與遊玩。我們只接受 itch.io 的提交連結。
						<br>
						<br>
						下面列出幾個過去黑客松的超酷作品，給你一些靈感：
					</p>
					
					<ul class="space-y-3 font-pixel text-lg md:text-xl max-sm:text-sm">
						<li class="flex items-start leading-loose max-sm:leading-relaxed">
							<span class="mr-4">•</span>
							<a href="https://bucketfish.itch.io/remedy-renemy" target="_blank" class="underline mr-2">Remedy Renemy</a>由 Tongyu 和 Kai Ling 製作
						</li>
						<li class="flex items-start leading-loose max-sm:leading-relaxed">
							<span class="mr-4">•</span>
							<a href="https://nanomars.itch.io/not-an-idle" target="_blank" class="underline mr-2">Not an Idle</a> 由 Armand 製作
						</li>
						<li class="flex items-start leading-loose max-sm:leading-relaxed">
							<span class="mr-4">•</span>
							<a href="https://juanes10201.itch.io/speedtickers" target="_blank" class="underline mr-2">SPEEDTICKERS</a> 由 Agustin 製作
						</li>
					</ul>
					
					<p class="text-lg md:text-xl max-sm:text-base opacity-90 font-pixel leading-loose tracking-wide max-sm:tracking-normal">
						Daydream 開跑前，我們會舉辦工作坊與活動，陪你用 Godot 入門做遊戲！
					</p>
					
					<!-- Bottom section with input -->
					<div class="flex flex-col md:flex-row md:items-end gap-10 max-sm:gap-6 pt-8">
						<div>
							<h3 class="text-2xl md:text-3xl max-sm:text-xl font-pixel mb-4 tracking-wider max-sm:tracking-normal">卡住了嗎？</h3>
															<button 
									class="bg-[#D1E3EE] text-[#061E2D] px-6 py-3 max-sm:px-4 max-sm:py-2 font-pixel text-lg md:text-xl max-sm:text-base hover:bg-[#B8D3E0] cursor-pointer max-sm:w-full tracking-wide max-sm:tracking-normal font-medium"
									on:click={dreamIdea}
								>
									幫我想個點子
								</button>
						</div>
						
						<div class="flex-1">
							<div class="border-2 border-[#D1E3EE] p-6 max-sm:p-4 min-h-40 max-h-40 max-sm:min-h-32 max-sm:max-h-32 w-full flex items-start overflow-y-auto idea-output-box">
								{#if ideaText}
									<p class="font-pixel text-lg md:text-xl max-sm:text-sm text-[#D1E3EE] w-full leading-loose tracking-wide max-sm:tracking-normal">
										{ideaText}{#if isTyping}<span class="animate-pulse">|</span>{/if}
									</p>
								{:else if showDice}
									<div class="flex items-center justify-around w-full h-full">
										{#each diceNumbers as diceNumber}
											<img 
												src="/dice/dice-{diceNumber}.png" 
												alt="Dice showing {diceNumber}"
												class="h-24 w-24 max-sm:h-16 max-sm:w-16 object-contain flex-shrink-0 max-w-[30%] [image-rendering:pixelated]"
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
			<img src="window-3.png" alt="window" class="w-full h-full object-contain max-md:scale-110 max-xl:scale-110 max-lg:scale-115 max-sm:scale-130">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-4 max-lg:px-14 max-xl:px-18 max-sm:top-[18%] max-sm:bottom-[18%] max-sm:left-[14%] max-sm:right-[14%]">
                <h3 class="text-lg md:text-xl font-serif font-bold mb-4 max-lg:mb-2 max-md:text-sm max-sm:text-xs max-sm:mb-2 leading-relaxed tracking-wide max-sm:tracking-normal">誰可以參加 Daydream？</h3>
                <p class="text-sm md:text-base max-sm:text-xs max-sm:leading-tight leading-relaxed tracking-wide max-sm:tracking-normal">全臺國高中生皆可參與（包含專科 1–3 年級、實驗教育之青少年；國中生亦可）。</p>
		</div>
		</div>

		<!-- FAQ Item 2 -->
		<div class="relative transform rotate-1">
			<img src="window-4.png" alt="window" class="w-full h-full object-contain max-md:scale-110 max-xl:scale-110 max-lg:scale-115 max-sm:scale-130">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-4 max-lg:px-14 max-xl:px-18 max-sm:top-[18%] max-sm:bottom-[18%] max-sm:left-[14%] max-sm:right-[14%]">
                <h3 class="text-lg md:text-xl font-serif font-bold mb-4 max-lg:mb-2 max-md:text-sm max-sm:text-xs max-sm:mb-2 leading-relaxed tracking-wide max-sm:tracking-normal">怎麼報名？</h3>
                <p class="text-sm md:text-base max-sm:text-xs max-sm:leading-tight leading-relaxed tracking-wide max-sm:tracking-normal">報名尚未開放；先在上方留下 email RSVP，開放時第一時間通知。名額有限，先卡位！</p>
			</div>
		</div>

		<!-- FAQ Item 3 -->
		<div class="relative transform rotate-2">
			<img src="window-2.png" alt="window" class="w-full h-full object-contain max-md:scale-110 max-xl:scale-110 max-lg:scale-115 max-sm:scale-130">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24  opacity-70 max-sm:mx-0 max-sm:px-4 max-lg:px-14 max-xl:px-18 max-sm:top-[18%] max-sm:bottom-[18%] max-sm:left-[14%] max-sm:right-[14%]">
				<h3 class="text-lg md:text-xl font-serif font-bold mb-4 max-lg:mb-2 max-md:text-sm max-sm:text-xs max-sm:mb-2 leading-relaxed tracking-wide max-sm:tracking-normal">全部都免費嗎？</h3>
				<p class="text-sm md:text-base max-sm:text-xs max-sm:leading-tight leading-relaxed tracking-wide max-sm:tracking-normal">沒錯！食物、周邊與好心情我們都準備好了。同時我們也提供交通報銷！請查看 <a href="https://go.hackit.tw/j44k" target="_blank" rel="noopener noreferrer" class="underline">https://go.hackit.tw/j44k</a> 看更多資訊！</p>
			</div>
		</div>

		<!-- FAQ Item 4 -->
		<div class="relative transform -rotate-1">
			<img src="window-1.png" alt="window" class="w-full h-full object-contain max-md:scale-110 max-xl:scale-110 max-lg:scale-115 max-sm:scale-130">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24  opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-4 max-lg:px-14 max-xl:px-18 max-sm:top-[18%] max-sm:bottom-[18%] max-sm:left-[14%] max-sm:right-[14%]">
				<h3 class="text-lg md:text-xl font-serif font-bold mb-4 max-lg:mb-2 max-md:text-sm max-sm:text-xs max-sm:mb-2 leading-relaxed tracking-wide max-sm:tracking-normal">要帶什麼？</h3>
				<p class="text-sm md:text-base max-sm:text-xs max-sm:leading-tight leading-relaxed tracking-wide max-sm:tracking-normal">筆電、充電器、盥洗用品、睡袋，還有一顆開放的心！</p>
			</div>
		</div>

		<!-- FAQ Item 5 -->
		<div class="relative transform rotate-1">
			<img src="window-4.png" alt="window" class="w-full h-full object-contain max-md:scale-110 max-xl:scale-110 max-lg:scale-115 max-sm:scale-130">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-4 max-lg:px-14 max-xl:px-18 max-sm:top-[18%] max-sm:bottom-[18%] max-sm:left-[14%] max-sm:right-[14%]">
                <h3 class="text-lg md:text-xl font-serif font-bold mb-4 max-lg:mb-2 max-md:text-sm max-sm:text-xs max-sm:mb-2 leading-relaxed tracking-wide max-sm:tracking-normal">Hack Club 以前做過什麼？</h3>
                <p class="text-sm md:text-base max-sm:text-xs max-sm:leading-tight leading-relaxed tracking-wide max-sm:tracking-normal">在 GitHub 總部、50+ 城市，甚至跨州火車上都辦過活動。更多瘋狂又有趣的企劃等你探索！</p>
			</div>
		</div>

		<!-- FAQ Item 6 -->
		<div class="relative transform rotate-1">
			<img src="window-3.png" alt="window" class="w-full h-full object-contain max-md:scale-110 max-xl:scale-110 max-lg:scale-115 max-sm:scale-130">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-4 max-lg:px-14 max-xl:px-18 max-sm:top-[18%] max-sm:bottom-[18%] max-sm:left-[14%] max-sm:right-[14%]">
				<h3 class="text-lg md:text-xl font-serif font-bold mb-4 max-lg:mb-2 max-md:text-sm max-sm:text-xs max-sm:mb-2 leading-relaxed tracking-wide max-sm:tracking-normal">不太會寫程式也可以參加嗎？</h3>
				<p class="text-sm md:text-base max-sm:text-xs max-sm:leading-tight leading-relaxed tracking-wide max-sm:tracking-normal">當然可以！這場 Game Jam 歡迎各種程度的同學。我們會有工作坊與活動，陪你一路學到會。</p>
			</div>
		</div>

		<!-- FAQ Item 7 -->
		<div class="relative transform -rotate-2">
			<img src="window-2.png" alt="window" class="w-full h-full object-contain max-md:scale-110 max-xl:scale-110 max-lg:scale-115 max-sm:scale-130">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-4 max-lg:px-14 max-xl:px-18 max-sm:top-[18%] max-sm:bottom-[18%] max-sm:left-[14%] max-sm:right-[14%]">
                <h3 class="text-lg md:text-xl font-serif font-bold mb-4 max-lg:mb-2 max-md:text-sm max-sm:text-xs max-sm:mb-2 leading-relaxed tracking-wide max-sm:tracking-normal">家長有疑慮怎麼辦？</h3>
                <p class="text-sm md:text-base max-sm:text-xs max-sm:leading-tight leading-relaxed tracking-wide max-sm:tracking-normal">家長有問題？寫信到 <a class="underline" href="mailto:taiwan@daydream.hackclub.com">taiwan@daydream.hackclub.com</a>，我們很樂意說明。</p>
			</div>
		</div>

		<!-- FAQ Item 8 -->
		<div class="relative transform -rotate-1">
			<img src="window-1.png" alt="window" class="w-full h-full object-contain max-md:scale-110 max-xl:scale-110 max-lg:scale-115 max-sm:scale-130">
			<div class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70 max-sm:mx-0 max-sm:px-4 max-lg:px-14 max-xl:px-18 max-sm:top-[18%] max-sm:bottom-[18%] max-sm:left-[14%] max-sm:right-[14%]">
				<h3 class="text-lg md:text-xl font-serif font-bold mb-4 max-lg:mb-2 max-md:text-sm max-sm:text-xs max-sm:mb-2 leading-relaxed tracking-wide max-sm:tracking-normal">在 Daydream 可以做什麼？</h3>
				<p class="text-sm md:text-base max-sm:text-xs max-sm:leading-tight leading-relaxed tracking-wide max-sm:tracking-normal">任何符合主題的遊戲都行：平台、視覺小說、點擊遊戲……盡情發揮創意！</p>
			</div>
		</div>
	</div>

	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
</div>

<Footer />

<!-- Hack Club Activities Modal -->
{#if showActivitiesPopup}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-70 flex items-center justify-center z-12000"
		on:click={closeActivitiesPopup}
		on:keydown={(e) => e.key === 'Escape' && closeActivitiesPopup()}
		role="dialog"
		aria-modal="true"
		aria-label="Hack Club Activities"
		tabindex="-1"
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative w-[92vw] max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden bg-[#FEFDF8] rounded-2xl border-4 border-[#E8E1D0] shadow-xl"
			on:click|stopPropagation
		>
			<button
				class="cursor-pointer absolute top-2 right-2 md:top-3 md:right-3 z-20 w-8 h-8 bg-white/80 md:bg-white/20 hover:bg-white/90 md:hover:bg-white/30 rounded-full flex items-center justify-center text-[#335969] md:text-white text-xl font-bold transition-colors duration-200"
				on:click={closeActivitiesPopup}
				aria-label="Close activities"
			>
				<span class="-translate-y-0.5">×</span>
			</button>
			<!-- Subtle paper texture overlay -->
			<div class="absolute inset-0 bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat opacity-15 pointer-events-none"></div>
			<!-- Header -->
			<div class="px-6 md:px-8 py-4 bg-[#F7F2E3] border-b-2 border-[#E8E1D0] relative">
				<h3 class="text-xl md:text-2xl font-serif font-bold text-[#335969] text-center tracking-wide">Hack Club 過去的活動</h3>
				<img src="/underline.svg" alt="" class="absolute left-1/2 -translate-x-1/2 -bottom-2 w-40 h-auto opacity-60" />
			</div>

			<!-- Content -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-0 relative overflow-x-hidden bg-[#F7F2E3]">
				<!-- Activities list -->
				<div class="lg:col-span-1 p-5 md:p-6 bg-white/60 lg:border-r-2 border-b-2 lg:border-b-0 border-[#E8E1D0]">
					<ul class="space-y-3">
						{#each hackClubActivities as act, i}
							<li>
								<button
									class="w-full text-left px-4 py-3 rounded-xl bg-white hover:bg-[#F7F2E3] border-2 border-[#E8E1D0] transition-colors tracking-wide text-[#335969]"
									on:click={() => selectedVideoId = act.youtubeId}
								>
									{act.title}
								</button>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Video player -->
				<div class="lg:col-span-2 p-4 md:p-6 bg-[#F7F2E3]">
					<div class="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-[#E8E1D0] shadow-lg bg-black">
						{#if selectedVideoId}
							<iframe
								src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
								title="Hack Club activity video"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowfullscreen
								class="w-full h-full"
							></iframe>
						{:else}
							<div class="w-full h-full flex items-center justify-center text-white/80 font-sans">選擇左側活動以播放影片</div>
						{/if}
					</div>

					<!-- More links -->
					<div class="mt-6 pt-4 border-t border-[#E8E1D0]">
						<h4 class="text-[#335969] font-sans font-medium mb-2">更多活動與專案</h4>
						<div class="flex flex-wrap gap-2">
							{#each moreHackClubProjects as proj}
								<a href={proj.url} target="_blank" rel="noopener noreferrer" class="px-3 py-1 rounded-full bg-white hover:bg-[#F7F2E3] text-[#335969] text-sm border border-[#E8E1D0]">{proj.name}</a>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

