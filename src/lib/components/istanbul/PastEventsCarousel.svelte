<script lang="ts">
	export type PastEvent = {
		image: string;
		title: string;
		date?: string;
		location?: string;
		description?: string;
		link?: string;
	};

	export let events: PastEvent[] = [];
	export let heading: string = "Past Events";
	let scroller: HTMLDivElement | null = null;

	function scrollByAmount(delta: number) {
		if (!scroller) return;
		scroller.scrollBy({ left: delta, behavior: "smooth" });
	}

	function onKeydown(e: KeyboardEvent) {
		if (!scroller) return;
		if (e.key === "ArrowRight") {
			e.preventDefault();
			scroller.scrollBy({ left: scroller.clientWidth * 0.9, behavior: "smooth" });
		}
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			scroller.scrollBy({ left: -scroller.clientWidth * 0.9, behavior: "smooth" });
		}
	}
</script>

<section aria-label={heading} class="w-full">
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-2xl font-bold">{heading}</h2>
		<div class="flex gap-2">
			<button class="rounded-full bg-black/10 hover:bg-black/20 px-3 py-2" aria-label="Scroll left" on:click={() => scrollByAmount(-400)}>
				&#8592;
			</button>
			<button class="rounded-full bg-black/10 hover:bg-black/20 px-3 py-2" aria-label="Scroll right" on:click={() => scrollByAmount(400)}>
				&#8594;
			</button>
		</div>
	</div>

	<div
		bind:this={scroller}
		tabindex="0"
		role="region"
		aria-roledescription="carousel"
		aria-label={heading}
		on:keydown={onKeydown}
		class="flex gap-4 overflow-x-auto px-1 pb-2 snap-x snap-mandatory scrollbar-thin"
		style="scrollbar-gutter: stable;"
	>
		{#each events as ev (ev.image)}
			<article class="min-w-[280px] max-w-[320px] snap-start shrink-0 bg-white/60 rounded-xl border border-black/10 shadow-sm overflow-hidden">
				{#if ev.link}
					<a href={ev.link} target={ev.link?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" class="block">
						<img src={ev.image} alt={ev.title} class="w-full h-44 object-cover" loading="lazy" />
					</a>
				{:else}
					<img src={ev.image} alt={ev.title} class="w-full h-44 object-cover" loading="lazy" />
				{/if}
				<div class="p-3">
					<h3 class="text-base font-semibold leading-tight">{ev.title}</h3>
					{#if ev.location || ev.date}
						<p class="text-sm text-black/70 mt-1">{ev.location}{ev.location && ev.date ? ' • ' : ''}{ev.date}</p>
					{/if}
					{#if ev.description}
						<p class="text-sm mt-2">{ev.description}</p>
					{/if}
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	/* Fallback if Tailwind scrollbar utilities are not present */
	:global(.scrollbar-thin) {
		scrollbar-width: thin;
	}
	:global(.scrollbar-thin::-webkit-scrollbar) {
		height: 8px;
	}
	:global(.scrollbar-thin::-webkit-scrollbar-thumb) {
		background-color: rgba(0,0,0,0.25);
		border-radius: 9999px;
	}
</style>

