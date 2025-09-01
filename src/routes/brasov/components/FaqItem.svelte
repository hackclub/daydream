<script lang="ts">
	export let title;
	export let text;
	export let image;
	export let rotation = 'rotate-0'; // default no rotation
</script>

<div class={`relative transform ${rotation}`}>
	<img src={image} alt="window"
			 class="w-full h-full object-contain max-md:scale-130 max-xl:scale-110 max-lg:scale-115" />

	<div
		class="absolute top-20 left-12 right-12 bottom-16 flex flex-col items-center justify-center text-center px-24 opacity-70
           max-[900px]:mx-[15vw] max-sm:mx-0 max-sm:px-5 max-lg:px-14 max-xl:px-18">
		<h3 class="text-xl font-serif font-bold mb-4 max-lg:mb-0 max-md:text-base">{title}</h3>
		<p class="text-sm">{text}</p>
	</div>
</div>