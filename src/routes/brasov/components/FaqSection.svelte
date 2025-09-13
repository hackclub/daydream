<script>
	import FaqItem from './FaqItem.svelte';

	const faqs = [
		{
			title: 'Cine poate participa?',
			text: 'Toți elevii de liceu și gimnaziu sunt bineveniți!',
			image: 'window-3.png',
			rotation: '-rotate-2'
		},
		{
			title: 'Pot să particip doar la Hackathon / Workshopuri?',
			text: 'Da, nu trebuie să participi la workshopuri ca să vii la hackathon și nu trebuie să vii la hackathon dacă doar vrei să înveți game development.',
			image: 'window-2.png',
			rotation: 'rotate-2'
		},
		{
			title: 'În ce pot crea jocul?',
			text: 'Jocurile din cadrul Hackathonului pot fi făcute în absolut orice mod, atât timp cât pot fi compilate și încărcate pe platorma itch.io pentru ca oricine să poată să le încerce.',
			image: 'window-1.png',
			rotation: '-rotate-1'
		},
		{
			title: 'Vom primi mâncare la hackathon?',
			text: 'Da, mâncare, suc și gustări sunt incluse.',
			image: 'window-4.png',
			rotation: 'rotate-1'
		},
		{
			title: 'Pot folosi AI pentru dezvoltarea jocului?',
			text: 'Participanților le este permis să folosească orice fel de unealtă de inteligență artificială pentru a se informa, pentru a genera cod și pentru a genera asset-uri atât timp cât nu tot codul este generat.',
			image: 'window-3.png',
			rotation: 'rotate-1'
		},
		{
			title: 'Pot folosi librării externe / cod împrumutat din alte proiecte (personale sau de pe internet)?',
			text: 'Nu este nicio problemă atât timp cât librăriile sau codul copiat nu reprezintă mare parte din joc.',
			image: 'window-2.png',
			rotation: '-rotate-2'
		},
		{
			title: 'Ce asset-uri pot folosi?',
			text: 'Participanții pot să își creeze propriile asseturi sau să folosească asset-uri preluate de pe internet de orice fel (efecte, sunete, imagini, modele 3D, cod), atât timp cât nu sunt încălcate drepturile de autor.',
			image: 'window-1.png',
			rotation: '-rotate-1'
		},
		{
			title: 'Pe ce vom lucra?',
			text: 'Toți participanții trebuie să își aducă propriul laptop pe care vor dezvolta jocul.',
			image: 'window-1.png',
			rotation: '-rotate-1'
		}
	];
</script>

<div
	class="w-full pb-24 max-md:pt-16 bg-gradient-to-b from-[#FAE3C9] to-[#e99cce] relative flex flex-col items-center justify-center">

	<img src="faq-clouds.png" alt="" class="w-full" />
	<img src="faq.png" alt="FAQ" class="mb-12 h-24 scale-175 max-md:scale-120" />

	<!-- FAQ Grid -->
	<div class="grid grid-cols-2 gap-8 max-w-6xl px-8 z-10 max-[900px]:grid-cols-1 max-md:gap-16">
		{#each faqs as faq}
			<FaqItem {...faq} />
		{/each}
	</div>

	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none">
	</div>
</div>