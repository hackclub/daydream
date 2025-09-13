<script>
  import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';

  $: currentUrl = `https://daydream.hackclub.com${$page.url.pathname}`;
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
</style>


<svelte:head>
	<title>Daydream Austin - Sponsor Information</title>
	<meta name="description" content="Detailed sponsor information for Daydream Austin" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://daydream.hackclub.com/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="Daydream" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
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
    <div class="absolute top-0 left-0 w-full h-full bg-[url('/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-30 pointer-events-none"></div>
   
	<!-- Cloudy Background -->
	<div class="cloudy-bg-parallax absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[80vh] bg-[url(/cloudy-bg.png)] opacity-30 bg-cover bg-no-repeat bg-top pointer-events-none"></div>
	
	<div class="buildings-back-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-back.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"></div>
	
	<!-- brush texture clipped to back buildings -->
	<div class="absolute top-0 left-0 w-full h-full bg-[url('/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat pointer-events-none opacity-100 lg:-translate-y-15 bg-center mix-blend-overlay" style="mask-image: url('/buildings-back.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center top; -webkit-mask-image: url('/buildings-back.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center top;"></div>
	
	<div class="buildings-front-parallax absolute top-0 left-0 w-full h-full bg-[url(/buildings-front.png)] bg-no-repeat bg-contain pointer-events-none lg:-translate-y-15"></div>
	<!-- brush texture clipped to front buildings -->
	<div class="absolute top-0 left-0 w-full h-full bg-[url('/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat pointer-events-none opacity-100 lg:-translate-y-15 bg-center mix-blend-overlay" style="mask-image: url('/buildings-front.png'); mask-size: contain; mask-repeat: no-repeat; mask-position: center top; -webkit-mask-image: url('/buildings-front.png'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center top;"></div>
	
	<div class="hero-ui-parallax flex flex-col items-center justify-center text-center relative z-5 -translate-y-2">
		<div class="inline-block relative">
			<div class="h-12"></div> 
			<!-- space for the ship -->
			<h2
			class="text-2xl tracking-widest font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent absolute left-1/2 max-sm:translate-y-4 max-sm:mb-0 max-md:-mb-8 md:left-[calc(50%+4rem)] -translate-x-1/2 bottom-8 italic w-max"
			>
				Austin
			</h2>
			<img src="/daydream.png" alt="Daydream" class="h-40 mb-6 w-auto object-contain max-w-full px-4" />
			<a href="https://hackclub.com" class="absolute top-0 -right-6 max-sm:right-0 max-sm:scale-80 animate-hover ![animation-delay:0.9s] ![--hover:-0.2rem]">
				<img src="/flag-plane.png" alt="Hack Club" class="h-28">
			</a>
		</div>
		<div class="relative inline-block px-4">
			<h3
				class="text-3xl italic font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent w-max max-sm:text-2xl mx-auto"
			>
			    Sponsor Information
			</h3>
			<img
				src="/underline.svg"
				alt=""
				class="absolute left-1/2 -translate-x-1/2 -mt-1 h-auto scale-115"
			/>
			<h4
				class="text-xl opacity-90 mt-2 font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent max-sm:text-xl"
			>
			    <a href="/austin" class="hover:underline decoration-[#487DAB]">Return to event home</a>
			</h4>
		</div>
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
</div>

<div class="w-full relative flex items-start justify-center">
	<!-- background -->
	<div class="absolute top-0 left-0 w-full h-full -z-50 bg-[#FCEFC5]"></div>
	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-30 pointer-events-none -z-40"></div>
	
	<div class="relative max-w-4xl mx-auto h-full flex items-start pt-24 max-sm:pt-40 px-8 max-sm:px-2">
		<div class="relative z-20 px-20 pt-20 pb-52 rounded-lg mb-0 max-sm:px-18" style="background-image: url('/letter-top.png'), linear-gradient(to bottom, #FCEFC5 100px, transparent 100px), url('/letter-loop.png'); background-size: 100% auto, 100% auto, 100% auto; background-repeat: no-repeat, no-repeat, repeat-y; background-position: top, top, top; background-attachment: local, local, local;">
			<div class="absolute bottom-0 left-0 w-full h-24 z-10 pointer-events-none bg-[url('/clouds-loop.png')] bg-repeat-x bg-bottom bg-contain"></div>
			<h2 class="text-5xl font-serif italic text-[#8B4513] mb-10 relative">
			    Thank you for your interest in supporting Daydream Austin!
				<img src="/underline.svg" alt="" class="absolute left-0 -bottom-3 w-64 h-auto opacity-70">
			</h2>
			
			<div class="text-[#8B4513] font-serif text-xl leading-relaxed space-y-8">
				<p>You'll find more information about sponsorship tiers and benefits below.</p>
				
				<p>If you'd like to support us but cannot give a monetary donation, we would love to have some of your swag to give out to attendees!</p>

				<p class="font-bold text-2xl">If you have any questions about sponsorships at all, please get in touch!</p>

				<div class="pt-8">
					<h3 class="text-3xl md:text-4xl font-pixel mb-4">Ready to support us?</h3>
					<div class="flex flex-col md:flex-row gap-2 items-start">
  						<a 
 							class="bg-[#D1E3EE] text-[#061E2D] px-8 py-4 font-pixel text-xl md:text-2xl hover:bg-[#B8D3E0] cursor-pointer max-sm:w-full"
 							href="https://hcb.hackclub.com/donations/start/daydream-austin"
  						>
      						Donate
  						</a>
  						
  						<a 
 							class="bg-[#D1E3EE] text-[#061E2D] px-8 py-4 font-pixel text-xl md:text-2xl hover:bg-[#B8D3E0] cursor-pointer max-sm:w-full"
 							href="mailto:austin@daydream.hackclub.com"
  						>
      						Get in Touch
                        </a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="w-full absolute z-30 max-h-64 bottom-0 max-2xl:translate-y-1/4 max-lg:translate-y-1/2 pointer-events-none">	
		<img src="/cloud-cover-1.png" alt="" class="w-full h-full object-contain min-[2048px]:hidden">
	</div>

</div>

<!-- Schedule Container -->
<div class="w-full bg-gradient-to-b from-[#FCEFC5] to-[#e99cce] py-16 px-2 md:px-8 flex justify-center">
	<div class="relative max-w-screen-lg w-full">
		<!-- Billboard Container -->
		<div class="relative bg-[#f0f9ff] border-[10px] border-b-[16px] border-[#888896] rounded-lg rounded-b-xl mx-auto z-40 h-screen flex flex-col">
			<!-- Billboard Lights (top) -->
			<img 
				src="/billboard-lights.png" 
				alt="" 
				class="absolute top-0 left-0 w-full h-auto object-contain pointer-events-none z-10 -translate-y-[calc(100%+9px)]"
			>
			
			<!-- Header Section -->
			<div class="w-full bg-[url('/billboard-bg-texture.png')] bg-contain bg-repeat py-6 relative" style="border-bottom: 8px solid #B4B4C5;">
				<h2 class="text-4xl font-serif text-[#F0F0FF] text-center">
				Sponsor Prospectus
				</h2>
				<!-- Brush texture overlay for header -->
				<div class="absolute top-0 left-0 w-full h-full bg-[url('/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
			</div>
			
			<!-- Main Content Area -->
			<iframe
			    class="relative bg-gradient-to-b from-[#CCF4FD] to-[#AECDF6] px-2 md:px-8 py-8 grow w-full max-w-screen-lg min-h-96" title="Sponsor prospectus"
			    src="https://drive.google.com/file/d/1OFEYeK-ZS_sRA966exhvP6S8DOVUYzZK/preview" loading="lazy">
			</iframe>
			
			<!-- Billboard Bars (bottom) -->
			<div 
				class="absolute bottom-0 -left-[5px] w-[calc(100%+10px)] h-6 bg-[url('/billboard-bars.png')] bg-repeat-x bg-contain bg-center pointer-events-none z-10 border-[#9898a7] border-x-[6px]"
			></div>
		</div>
		
		<!-- Billboard Pillars -->
		<div 
			class="absolute top-1/2 left-[15%] w-[10vw] h-48 max-w-12 -bottom-12 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain"
			style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
		>
			<div class="absolute bottom-0 left-0 w-full h-auto bg-[url('/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"></div>
		</div>
		<div 
			class="absolute top-1/2 right-[15%] w-[10vw] h-48 max-w-12 -bottom-12 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain"
			style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
		>
			<div class="absolute bottom-0 left-0 w-full h-auto bg-[url('/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"></div>
		</div>
	</div>
</div>

<Footer />
