<script lang="ts">
	import { eventName, signupLink } from '../data.js';
</script>

<div
	class="flex flex-row flex-wrap w-full h-auto bg-gradient-to-b from-[#FCEFC5] to-[#FEC1CF] px-36 max-md:px-8 pb-50 max-sm:pb-24 relative"
	id="islands-container">

	<img src="/clouds-left-2.png" alt="" class="absolute left-0 w-3/12 top-12 pointer-events-none">
	<img src="/clouds-left-3.png" alt="" class="absolute left-0 w-2/12 bottom-32 pointer-events-none">
	<img src="/clouds-right-2.png" alt="" class="absolute right-0 w-3/12 bottom-0 pointer-events-none">

	<!-- SVG Path Overlay -->
	<svg class="absolute inset-0 w-full h-full pointer-events-none z-0" id="path-svg">
		<path id="dotted-path" stroke="rgba(255,255,255,0.5)" stroke-width="3" fill="none" stroke-dasharray="8,8"
					opacity="0.7"></path>
	</svg>

	<img src="paper-airplane.png" alt="Paper airplane" class="h-16 absolute" id="paper-airplane">

	<div class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full z-10">
		<div class="relative translate-y-8 max-md:translate-y-4 z-30">
			<img src="/letter-1-front.png" alt=""
					 class="object-contain absolute -bottom-16 -left-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.7s] z-20">
			<img src="/letter-1-back.png" alt=""
					 class="object-contain absolute -bottom-16 -left-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.7s] z-10">
			<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:1.7s] z-20"
					 data-point="1">
				<img src="paper1.png" alt="" class="w-full h-full object-contain">
				<div
					class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
					<span class="font-sans text-[#E472AB] font-bold text-[1.3rem] mr-1">#1:</span> <a href={signupLink}
																																														class="underline">Înscrie-te
					la</a> Daydream {eventName}
				</div>
			</div>
		</div>
		<img src="/island-1.png" alt=""
				 class="w-72 h-72 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:0.8s] z-0">
	</div>

	<div
		class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full translate-y-24 max-md:translate-y-8 z-10">
		<div class="relative translate-y-24 max-md:translate-y-4 z-30">
			<img src="/letter-2-front.png" alt=""
					 class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.1s] z-20">
			<img src="/letter-2-back.png" alt=""
					 class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.1s] z-10">
			<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:0.3s] z-20"
					 data-point="2">
				<img src="paper2.png" alt="" class="w-full h-full object-contain">
				<div
					class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
					<span class="font-sans text-[#639DEB] font-bold text-[1.3rem] mr-1">#2:</span> Participă la workshopuri și
					învață să creezi jocuri
				</div>
			</div>
		</div>
		<img src="/island-3.png" alt=""
				 class="w-86 h-86 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:1.2s] z-0">
	</div>
	<div
		class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full -translate-x-12 max-md:translate-x-0 max-md:translate-y-8 z-10">
		<div class="relative translate-y-8 max-md:translate-y-4 z-30">
			<img src="/letter-3-front.png" alt=""
					 class="object-contain absolute -bottom-18 left-24 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.9s] z-20">
			<img src="/letter-3-back.png" alt=""
					 class="object-contain absolute -bottom-18 left-24 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.9s] z-10">
			<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:1.4s] z-20"
					 data-point="3">
				<img src="paper3.png" alt="" class="w-full h-full object-contain">
				<div
					class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
					<span class="font-sans text-[#AB68E2] font-bold text-[1.3rem] mr-1">#3:</span> Fă rost de o echipă de maximum
					3 membrii
				</div>
			</div>
		</div>
		<img src="/island-2.png" alt=""
				 class="w-72 h-72 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:2.1s] z-0">
	</div>
	<div
		class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full translate-y-30 max-md:translate-y-8 z-10">
		<div class="relative translate-y-24 max-md:translate-y-4 z-30">
			<img src="/letter-4-front.png" alt=""
					 class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.6s] z-20">
			<img src="/letter-4-back.png" alt=""
					 class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.6s] z-10">
			<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:2.3s] z-20"
					 data-point="4">
				<img src="paper4.png" alt="" class="w-full h-full object-contain">
				<div
					class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
					<span class="font-sans text-[#F2993E] font-bold text-[1.3rem] mr-1">#4:</span> Începe să lucrezi la joc
				</div>
			</div>
		</div>
		<img src="/island-4.png" alt=""
				 class="w-88 h-88 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:0.5s] z-0">
	</div>

	<!-- Final Card -->
	<div class="flex flex-col items-center w-full basis-full translate-y-40 max-md:translate-y-12 z-20">
		<div class="relative">
			<div
				class="bg-[url('/card-final.png')] bg-contain bg-no-repeat bg-center text-2xl font-serif pt-24 px-8 w-128 h-96 text-center max-md:w-80 max-md:h-80 max-md:text-xl max-md:pt-16 animate-hover ![--hover:-0.15rem] ![animation-delay:1.9s]"
				data-point="5">
				<span class="font-sans text-[#F2CC32] font-bold text-[1.5rem] mr-1">#5:</span> Împărtășește ce ai creat cu
				lumea!
			</div>
		</div>
	</div>

	<img src="/clouds-pink-left.png" alt=""
			 class="absolute left-0 w-5/12 bottom-0 translate-y-32 z-50 pointer-events-none">
	<img src="/clouds-pink-right.png" alt=""
			 class="absolute right-0 w-5/12 bottom-0 translate-y-32 z-50 pointer-events-none">

	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none bg-position-[0_100vh]"></div>
</div>