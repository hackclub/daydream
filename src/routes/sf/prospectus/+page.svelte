<script>
	import PageBackground from './_components/PageBackground.svelte';
	import PrintLayout from './_components/PrintLayout.svelte';
	import Carousel from './_components/Carousel.svelte';
	import ContentSection from './_components/ContentSection.svelte';
	import SponsorshipTiers from './_components/SponsorshipTiers.svelte';
	import ContactInfo from './_components/ContactInfo.svelte';
</script>

<svelte:head>
	<title>Daydream SF Prospectus</title>
</svelte:head>

<PrintLayout />

<div class="page w-full bg-gradient-to-b from-[#CCF4FD] to-[#FAE3C9] py-12 px-4 sm:px-8">
	<PageBackground />

	<section class="mx-auto max-w-4xl font-serif text-[#3a2a1a] mt-40">
		<div class="flex items-center justify-center no-print">
			<img src="/daydream.png" alt="Daydream" class="h-24" />
		</div>
		<h1 class="mt-4 text-center font-serif text-5xl font-bold text-[#487DAB] print:text-4xl">
			Daydream San Francisco
		</h1>
		<div class="mt-12 space-y-6 text-lg leading-relaxed">
			<h2 class="text-3xl font-bold text-[#8B4513]">What is Daydream San Francisco?</h2>
			<p>
				This September 27th-28th, we are running <strong>Daydream San Francisco</strong>, a 24-hour
				game jam where 200 of the Bay Area's brightest young minds will gather to create incredible
				video games from scratch.
			</p>
			<p>
				Daydream is a beginner-friendly event designed for high schoolers. It's a space where
				coders, artists, designers, and musicians collaborate in a whirlwind of creativity. As part
				of Hack Club's largest-ever global event, our hackathon will run simultaneously with dozens
				of other Daydreams in cities around the world, from Singapore to London.
			</p>
			<p>
				Daydream is operated by <strong>Hack Club</strong>, a 501(c)(3) nonprofit organization that
				empowers over 50,000+ teenagers globally through a network of coding clubs and events. Hack
				Club has a legacy of running ambitious, high-energy events for teens, including a hackathon
				on a train across America.
			</p>
			<h2 class="pt-4 text-3xl font-bold text-[#8B4513]">Our Mission</h2>
			<p>
				Our mission is to empower the next generation of creators in the Bay Area by introducing
				them to game development in a fun, collaborative, and low-stakes environment. We want to
				show them the magic of building something real with a team of their peers. For many,
				Daydream will be their first exposure to the joy of coding and the creative challenges of
				game design.
			</p>
		</div>
	</section>

	<ContentSection class="mt-12" pageBreak={true}>
		<h2 class="pt-4 text-3xl font-bold text-[#8B4513]">An Experienced Team You Can Trust</h2>
		<p>
			Our organizing team has a proven track record of creating successful, large-scale events for
			high schoolers in Silicon Valley. Our leadership previously organized
			<strong>Counterspell</strong> and <strong>Scrapyard SV</strong>, raising over
			<strong>$15,000</strong> and bringing together more than <strong>200 students</strong> for unforgettable
			hackathon experiences. We know how to create a safe, inspiring, and impactful event.
		</p>

		<Carousel />
	</ContentSection>

	<ContentSection class="mt-16" pageBreak={true}>
		<h2 class="text-3xl font-bold text-[#8B4513]">Join Us in Building Dreams</h2>
		<p>
			To make Daydream SF a free and accessible event for 200 students, we rely on the generosity of
			forward-thinking companies like yours. Your support directly funds the food, prizes, and
			resources that make this magical 24-hour experience possible.
		</p>
		<p>
			Your contributions are <strong>tax-deductible</strong>. Daydream San Francisco is a fiscally
			sponsored event under The Hack Foundation, a 501(c)(3) nonprofit organization. (EIN:
			81-2908499).
		</p>

		<h2 class="pt-4 text-3xl font-bold text-[#8B4513]">Our Venue: The Cloudflare Headquarters</h2>
		<p>
			We couldn't be more excited to partner with Cloudflare, who's opening their stunning global
			headquarters to our students. 200 young creators building their dream games in one of San
			Francisco's most innovative spaces; a beautiful scene for a weekend of coding, creativity, and
			collaboration. Having Cloudflare believe in our mission enough to host us means the world
			&mdash; and it gives our students a glimpse into where their passion for tech could take them.
		</p>
	</ContentSection>

	<SponsorshipTiers />

	<ContactInfo />
</div>

<style>
	@media print {
		:global(body) {
			font-size: 14pt;
			-webkit-print-color-adjust: exact;
			print-color-adjust: exact;
			height: 100% !important;
			overflow: visible;
			background: linear-gradient(#b8d9f8, #ccf4fd) !important;
			background-size: 100vw 100vh !important;
		}

		:global(.no-print) {
			display: none !important;
		}

		:global(section) {
			margin-top: 16rem;
		}

		.page {
			width: 100% !important;
			min-height: 0 !important;
			margin: 0 !important;
			padding: 0 2rem !important;
			box-shadow: none !important;
			background: none !important;
		}

		.page > :global(img) {
			display: none !important;
		}

		:global(.page-break) {
			break-before: page;
		}

		h1,
		h2,
		h3 {
			color: black !important;
		}
	}
</style>
