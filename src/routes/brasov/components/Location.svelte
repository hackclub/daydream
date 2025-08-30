<script>
	import { directionsURL, eventAddress, eventName } from '../data.js';
</script>

<div class="w-full max-w-5xl lg:max-w-6xl mx-auto px-2 md:px-8">
	<div class="relative w-full min-w-72">
		{#if eventAddress}
			<p class="text-center font-sans text-2xl pt-12 max-sm:text-xl text-[#60574b] z-10000">
				{#if directionsURL}
					Daydream {eventName} is taking place at <a class="underline text-pink"
																										 href={directionsURL}>{eventAddress}</a>!
				{:else}
					Daydream {eventName} is taking place at <span class="underline">{eventAddress}</span>!
				{/if}
			</p>
		{/if}
	</div>
</div>

<div
	class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
