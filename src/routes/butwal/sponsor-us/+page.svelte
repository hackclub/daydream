<script>
	import { onMount } from 'svelte';
	
	onMount(() => {
		// Client-side redirect as backup
		window.location.href = 'https://daydream.butwalhacks.com/sponsor-us';
	});
</script>

<svelte:head>
	<title>Redirecting to Sponsor Information...</title>
	<meta http-equiv="refresh" content="0; URL=https://daydream.butwalhacks.com/sponsor-us">
</svelte:head>

<div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#CCF4FD] to-[#B8D9F8]">
	<div class="text-center">
		<h1 class="text-3xl font-serif text-gray-800 mb-4">Redirecting to Sponsor Information...</h1>
		<p class="text-lg text-gray-600 mb-6">
			You're being redirected to our sponsor information page.
		</p>
		<a 
			href="https://daydream.butwalhacks.com/sponsor-us" 
			class="text-blue-600 hover:text-blue-800 underline text-lg"
		>
			Click here if you're not redirected automatically
		</a>
	</div>
</div>