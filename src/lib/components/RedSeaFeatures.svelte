<script lang="ts">
	import { onMount } from 'svelte';
	
	export let eventName: string;
	
	let showChat = false;
	let chatMessages: Array<{id: number, user: string, message: string, time: string, isBot?: boolean}> = [];
	let newMessage = '';
	let isTyping = false;
	
	// Enhanced chatbot responses
	const botResponses = {
		greeting: [
			"Hello! Welcome to Daydream Red Sea! 👋 How can I help you today?",
			"Hi there! I'm here to help with any questions about Daydream Red Sea! 🎮",
			"Welcome! Ask me anything about the event, registration, or what to expect!"
		],
		registration: [
			"To register for Daydream Red Sea, click the sign-up button on the main page or visit: https://forms.hackclub.com/daydream-sign-up?event=recfLqydkliPcUYoe",
			"Registration is free! Just fill out the form and you'll receive confirmation details.",
			"Sign up now to secure your spot! The event is open to all high-school & upper-middle-school students."
		],
		location: [
			"Daydream Red Sea is taking place at South Valley University Hurghada Branch, Ras Ghareb - Hurghada Rd, Red Sea Governorate",
			"You can find directions here: https://maps.app.goo.gl/frKTnS8kkmSts9sH6",
			"The venue is easily accessible and we'll provide detailed directions closer to the event."
		],
		time: [
			"Daydream Red Sea is on Saturday, September 27th, 2025 from 10:00 AM to 10:00 PM (12 hours total)",
			"The event runs from 10 AM to 10 PM - a full day of game development fun!",
			"Mark your calendar: September 27th, 2025 - 12 hours of creativity and coding!"
		],
		workshops: [
			"We have 2 exciting workshops: Game Development Workshop 1 (11:00 AM) and Game Development Workshop 2 (2:00 PM)",
			"Learn game development basics in the morning and advanced concepts in the afternoon!",
			"Two workshops covering everything from basics to advanced game mechanics."
		],
		prizes: [
			"Prizes are TBA - we're working on some amazing rewards! Stay tuned for updates.",
			"We'll announce the prize details soon. They'll be worth the wait! 🏆",
			"Prizes are still being finalized, but they'll be exciting for sure!"
		],
		requirements: [
			"Bring your laptop, chargers, and an open mind! No coding experience required.",
			"You'll need a laptop and enthusiasm. We'll teach you everything else!",
			"Just bring your laptop and creativity. We provide the rest!"
		],
		contact: [
			"For specific questions, email us at: redsea.stem.hackclub@gmail.com",
			"Contact the event organizers at: redsea.stem.hackclub@gmail.com",
			"Need help? Reach out to: redsea.stem.hackclub@gmail.com"
		],
		default: [
			"I'm not sure about that, but you can email us at redsea.stem.hackclub@gmail.com for specific questions!",
			"That's a great question! For detailed information, please contact: redsea.stem.hackclub@gmail.com",
			"I don't have that information, but our team can help! Email: redsea.stem.hackclub@gmail.com"
		]
	};
	
	// Quick response buttons
	const quickResponses = [
		"Registration",
		"Location & Time", 
		"Workshops",
		"Prizes",
		"What to bring",
		"Contact"
	];
	
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
	
	// Event highlights
	const highlights = [
		{
			icon: '🎮',
			title: 'Game Development',
			description: 'Learn to create games using Godot engine'
		},
		{
			icon: '🤝',
			title: 'Team Building',
			description: 'Work with other talented students'
		},
		{
			icon: '🏆',
			title: 'Prizes & Awards',
			description: 'Prizes TBA - Stay tuned for exciting rewards!'
		},
		{
			icon: '🍕',
			title: 'Free Food',
			description: 'Delicious meals and snacks provided'
		},
		{
			icon: '🎓',
			title: 'Mentorship',
			description: 'Get guidance from industry experts'
		},
		{
			icon: '🎉',
			title: 'Fun Activities',
			description: 'Enjoy games and entertainment'
		}
	];
	
	function getBotResponse(userMessage: string): string {
		const message = userMessage.toLowerCase();
		
		// Check for different types of questions
		if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
			return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
		}
		if (message.includes('register') || message.includes('sign up') || message.includes('signup') || message.includes('apply')) {
			return botResponses.registration[Math.floor(Math.random() * botResponses.registration.length)];
		}
		if (message.includes('where') || message.includes('location') || message.includes('venue') || message.includes('address')) {
			return botResponses.location[Math.floor(Math.random() * botResponses.location.length)];
		}
		if (message.includes('when') || message.includes('time') || message.includes('date') || message.includes('schedule')) {
			return botResponses.time[Math.floor(Math.random() * botResponses.time.length)];
		}
		if (message.includes('workshop') || message.includes('learn') || message.includes('teach') || message.includes('class')) {
			return botResponses.workshops[Math.floor(Math.random() * botResponses.workshops.length)];
		}
		if (message.includes('prize') || message.includes('win') || message.includes('award') || message.includes('reward')) {
			return botResponses.prizes[Math.floor(Math.random() * botResponses.prizes.length)];
		}
		if (message.includes('bring') || message.includes('need') || message.includes('require') || message.includes('laptop')) {
			return botResponses.requirements[Math.floor(Math.random() * botResponses.requirements.length)];
		}
		if (message.includes('contact') || message.includes('email') || message.includes('help') || message.includes('question')) {
			return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
		}
		
		// Default response
		return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
	}
	
	function sendMessage(message?: string) {
		const messageToSend = message || newMessage;
		if (messageToSend.trim()) {
			chatMessages = [...chatMessages, {
				id: Date.now(),
				user: 'You',
				message: messageToSend,
				time: new Date().toLocaleTimeString()
			}];
			
			if (!message) {
				newMessage = '';
			}
			
			// Get intelligent response
			setTimeout(() => {
				isTyping = true;
				setTimeout(() => {
					const botResponse = getBotResponse(messageToSend);
					chatMessages = [...chatMessages, {
						id: Date.now() + 1,
						user: 'Event Bot',
						message: botResponse,
						time: new Date().toLocaleTimeString(),
						isBot: true
					}];
					isTyping = false;
				}, 1500);
			}, 800);
		}
	}
	
	function sendQuickResponse(response: string) {
		// Add user message
		chatMessages = [...chatMessages, {
			id: Date.now(),
			user: 'You',
			message: response,
			time: new Date().toLocaleTimeString()
		}];
		
		// Get intelligent response
		setTimeout(() => {
			isTyping = true;
			setTimeout(() => {
				const botResponse = getBotResponse(response);
				chatMessages = [...chatMessages, {
					id: Date.now() + 1,
					user: 'Event Bot',
					message: botResponse,
					time: new Date().toLocaleTimeString(),
					isBot: true
				}];
				isTyping = false;
			}, 1500);
		}, 800);
	}
	
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			sendMessage();
		}
	}
</script>

<!-- Event Highlights Section -->
<div class="w-full bg-gradient-to-b from-[#FCEFC5] to-[#FEC1CF] py-16 px-8">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-4xl font-serif text-center text-[#8B4513] mb-12">
			Why Join Daydream {eventName}?
		</h2>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each highlights as highlight}
				<div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg">
					<div class="text-4xl mb-4">{highlight.icon}</div>
					<h3 class="text-xl font-bold text-[#335969] mb-2">{highlight.title}</h3>
					<p class="text-[#477783]">{highlight.description}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

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

<!-- Live Chat Widget -->
<div class="fixed bottom-6 right-6 z-50">
	<!-- Chat Toggle Button -->
	<button 
		class="bg-pink text-white p-4 rounded-full shadow-lg hover:bg-pink-dark transition-all duration-200 hover:scale-110"
		on:click={() => showChat = !showChat}
	>
		{#if showChat}
			<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
				<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
			</svg>
		{:else}
			<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
				<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
			</svg>
		{/if}
	</button>
	
	<!-- Chat Window -->
	{#if showChat}
		<div class="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
			<!-- Chat Header -->
			<div class="bg-pink text-white p-4 rounded-t-lg">
				<h3 class="font-bold">Daydream {eventName} Support</h3>
				<p class="text-sm opacity-90">Ask us anything!</p>
			</div>
			
			<!-- Chat Messages -->
			<div class="flex-1 overflow-y-auto p-4 space-y-3 max-h-64">
				<!-- Welcome message and quick choices -->
				{#if chatMessages.length === 0}
					<div class="text-center text-gray-500 text-sm">
						<p class="mb-3">Welcome! Ask me anything about Daydream Red Sea!</p>
						<div class="space-y-2">
							{#each quickResponses as response}
								<button 
									class="block w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
									on:click={() => sendQuickResponse(response)}
								>
									{response}
								</button>
							{/each}
						</div>
					</div>
				{:else}
					<!-- Show quick choices after first interaction -->
					<div class="mb-3">
						<p class="text-xs text-gray-500 mb-2">Quick questions:</p>
						<div class="grid grid-cols-2 gap-1">
							{#each quickResponses as response}
								<button 
									class="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
									on:click={() => sendQuickResponse(response)}
								>
									{response}
								</button>
							{/each}
						</div>
					</div>
				{/if}
				
				{#each chatMessages as message}
					<div class="flex {message.user === 'You' ? 'justify-end' : 'justify-start'}">
						<div class="max-w-xs {message.user === 'You' ? 'bg-pink text-white' : 'bg-gray-100 text-gray-800'} rounded-lg px-3 py-2">
							<div class="text-xs opacity-75 mb-1">{message.user}</div>
							<div>{message.message}</div>
							<div class="text-xs opacity-75 mt-1">{message.time}</div>
						</div>
					</div>
				{/each}
				
				{#if isTyping}
					<div class="flex justify-start">
						<div class="bg-gray-100 text-gray-800 rounded-lg px-3 py-2">
							<div class="text-xs opacity-75 mb-1">Event Bot</div>
							<div class="flex space-x-1">
								<div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
								<div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
								<div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
							</div>
						</div>
					</div>
				{/if}
			</div>
			
			<!-- Chat Footer - Only show quick choices -->
			<div class="p-4 border-t border-gray-200">
				<div class="text-center">
					<p class="text-sm text-gray-600 mb-2">Choose a question to ask:</p>
					<div class="grid grid-cols-2 gap-2">
						{#each quickResponses as response}
							<button 
								class="text-sm px-3 py-2 bg-pink text-white rounded-lg hover:bg-pink-dark transition-colors"
								on:click={() => sendQuickResponse(response)}
							>
								{response}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<!-- Quick Stats Section -->
<div class="w-full bg-[#FCEFC5] py-16 px-8">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-4xl font-serif text-[#8B4513] mb-12">Event Statistics</h2>
		
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
			<div class="bg-white/60 rounded-lg p-6">
				<div class="text-3xl font-bold text-pink mb-2">100+</div>
				<div class="text-[#477783]">Participants</div>
			</div>
			<div class="bg-white/60 rounded-lg p-6">
				<div class="text-3xl font-bold text-pink mb-2">12</div>
				<div class="text-[#477783]">Hours</div>
			</div>
			<div class="bg-white/60 rounded-lg p-6">
				<div class="text-3xl font-bold text-pink mb-2">2</div>
				<div class="text-[#477783]">Workshops</div>
			</div>
			<div class="bg-white/60 rounded-lg p-6">
				<div class="text-3xl font-bold text-pink mb-2">TBA</div>
				<div class="text-[#477783]">Prizes</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Custom animations */
	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-10px);
		}
		60% {
			transform: translateY(-5px);
		}
	}
	
	.animate-bounce {
		animation: bounce 1s infinite;
	}
</style>
