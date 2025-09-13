<script lang="ts">
	import { onMount } from 'svelte';
	import img1 from '../_images/img1.jpg';
	import img2 from '../_images/img2.jpg';
	import img3 from '../_images/img3.jpg';
	import img4 from '../_images/img4.jpg';
	import img5 from '../_images/img5.jpg';

	let emblaApi = null;

	onMount(() => {
		const emblaNode = document.querySelector('.embla');
		const options = { loop: false };
		emblaApi = EmblaCarousel(emblaNode, options);
	});
</script>

<svelte:head>
	<script src="https://unpkg.com/embla-carousel/embla-carousel.umd.js"></script>
</svelte:head>

<div class="relative hidden-on-print">
	<button
		class="absolute size-8 rounded-full -left-10 top-1/2 -translate-y-1/2 hover:bg-gray-800/10"
		onclick={emblaApi?.scrollPrev}
	>
		<img
			src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFycm93LWxlZnQtaWNvbiBsdWNpZGUtYXJyb3ctbGVmdCI+PHBhdGggZD0ibTEyIDE5LTctNyA3LTciLz48cGF0aCBkPSJNMTkgMTJINSIvPjwvc3ZnPg=="
			alt=""
		/>
		<span class="sr-only">Previous slide</span>
	</button>

	<div class="embla overflow-hidden">
		<div class="flex items-center -ml-4">
			{#each [img1, img2, img3, img4, img5] as img}
				<div class="embla__slide pl-4">
					<img src={img} alt="Previous hackathons that we've hosted" class="rounded-2xl" />
				</div>
			{/each}
		</div>
	</div>

	<button
		class="absolute size-8 rounded-full -right-10 top-1/2 -translate-y-1/2"
		onclick={emblaApi?.scrollNext}
	>
		<img
			src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFycm93LXJpZ2h0LWljb24gbHVjaWRlLWFycm93LXJpZ2h0Ij48cGF0aCBkPSJNNSAxMmgxNCIvPjxwYXRoIGQ9Im0xMiA1IDcgNy03IDciLz48L3N2Zz4="
			alt=""
		/>
		<span class="sr-only">Previous slide</span>
	</button>
</div>

<div class="hidden print-x-layout">
	<div class="grid-container">
		<img src={img2} alt="" class="shadow-lg rounded-2xl img2" />
		<img src={img3} alt="" class="shadow-lg rounded-2xl img3" />
		<img src={img1} alt="" class="shadow-lg rounded-2xl img1-center" />
		<img src={img4} alt="" class="shadow-lg rounded-2xl img4" />
		<img src={img5} alt="" class="shadow-lg rounded-2xl img5" />
	</div>
</div>

<style>
	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
	}

	@media print {
		.hidden-on-print {
			display: none;
		}

		.print-x-layout {
			display: block;
		}

		.grid-container {
			display: grid;
			grid-template-columns: repeat(12, 1fr);
			grid-template-rows: 1fr 1fr 1fr;
			width: 100%;
			align-items: center;
		}

		.img1-center {
			grid-column: 4 / 9;
			grid-row: 2;
			transform: scale(1.5);
			z-index: 1;
		}

		.img2 {
			grid-column: 1 / 5;
			grid-row: 1;
		}

		.img3 {
			grid-column: 9 / 13;
			grid-row: 1;
		}

		.img4 {
			grid-column: 1 / 5;
			grid-row: 3;
		}

		.img5 {
			grid-column: 9 / 13;
			grid-row: 3;
		}
	}
</style>
