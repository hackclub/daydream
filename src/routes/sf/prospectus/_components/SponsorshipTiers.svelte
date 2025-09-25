<script>
	let { splitAfterPerkGroups = 2 } = $props();

	const tiers = [
		{ name: 'In-Kind', contribution: 'Non-Fiscal', color: 'bg-white/50' },
		{ name: 'Dreamer', contribution: '$500+', color: 'bg-[#FAE3C9]/70' },
		{ name: 'Visionary', contribution: '$1,000+', color: 'bg-[#CCF4FD]/70' },
		{ name: 'Stargazer', contribution: '$2,500+', color: 'bg-[#f7dbe9]/70' },
		{ name: 'Sky-Painter', contribution: '$5,000+', color: 'bg-[#dcd4e8]/70' }
	];

	const perksData = [
		{
			category: 'Branding & Recognition',
			items: [
				{ name: 'Logo on Website', values: ['', 'Small', 'Medium', 'Large', 'Premier'] },
				{ name: 'Logo on Event Signage', values: ['', '', '', 'Large', 'Premier'] },
				{ name: 'Logo on Opening/Closing Slides', values: ['', '', 'Medium', 'Large', 'Premier'] },
				{ name: 'Verbal "Thank You" at Ceremonies', values: ['', '✅', '✅', '✅', '✅'] },
				{ name: 'Social Media Spotlight', values: ['', '', '1 Post', '2 Posts', 'Dedicated Posts'] }
			]
		},
		{
			category: 'Event Engagement',
			items: [
				{ name: 'Send Mentors', values: ['✅', '✅', '✅', '✅', '✅'] },
				{ name: 'Guaranteed Judging Spot', values: ['', '', '1 Spot', '2 Spots', '2 Spots'] },
				{ name: 'Sponsor Table', values: ['', '', '✅', '✅', 'Premium Location'] },
				{ name: 'Host a Game Dev Workshop', values: ['', '', '1', '2', 'Up to 3'] },
				{
					name: 'Opening Ceremony Talk',
					values: ['', '', '1-min Mention', '3-min Talk', 'Keynote']
				},
				{ name: 'Name a Prize Category', values: ['', '', '', '✅', '✅'] }
			]
		},
		{
			category: 'Future Talent & Pipeline',
			items: [
				{ name: 'Distribute Swag & Prizes', values: ['✅', '✅', '✅', '✅', '✅'] },
				{ name: 'Share Internship/Career Info', values: ['', '✅', '✅', '✅', '✅'] },
				{
					name: 'Access to Project Gallery (Opt-in)',
					values: ['', '', '', '✅', '✅']
				},
				{
					name: 'Dedicated Email to Attendees',
					values: ['', '', '', 'Post-event', 'Pre & Post-event']
				}
			]
		}
	];
</script>

{#snippet table_head()}
	<thead class="text-base font-bold text-[#3a2a1a]">
		<tr>
			<th class="rounded-tl-2xl bg-[#EAEFF4] p-3 align-bottom">Tier</th>
			{#each tiers as tier, i}
				<th class="p-3 {tier.color}" class:rounded-tr-2xl={i === tiers.length - 1}>
					{tier.name}
				</th>
			{/each}
		</tr>
		<tr>
			<th class="bg-[#EAEFF4] p-3">Contribution</th>
			{#each tiers as tier}
				<th class="p-3 font-normal {tier.color}">{tier.contribution}</th>
			{/each}
		</tr>
	</thead>
{/snippet}

{#snippet table_body(perks)}
	<tbody class="text-[#3a2a1a]">
		{#each perks as perkGroup}
			<tr class="bg-[#CCF4FD]">
				<td class="p-3 text-left font-bold" colspan={tiers.length + 1}>
					{perkGroup.category}
				</td>
			</tr>
			{#each perkGroup.items as perk, i}
				<tr class={i % 2 === 0 ? 'bg-white' : 'bg-[#EBF5FA]'}>
					<td class="p-3 text-left font-semibold">{perk.name}</td>
					{#each perk.values as value}
						<td>{value || ''}</td>
					{/each}
				</tr>
			{/each}
		{/each}
	</tbody>
{/snippet}

<section class="page-break mx-auto max-w-6xl">
	<h2 class="mt-16 text-center font-serif text-3xl font-bold text-[#8B4513]">Sponsorship Tiers</h2>
	<div class="no-print mt-8 overflow-hidden rounded-2xl shadow-lg">
		<table class="prospectus-table w-full text-center text-sm font-serif">
			{@render table_head()}
			{@render table_body(perksData)}
		</table>
	</div>

	<div class="hidden print:block">
		<div class="mt-8 overflow-hidden rounded-2xl shadow-lg">
			<table class="prospectus-table w-full text-center text-sm font-serif">
				{@render table_head()}
				{@render table_body(perksData.slice(0, splitAfterPerkGroups))}
			</table>
		</div>

		<div class="page-break overflow-hidden rounded-2xl shadow-lg pt-[16rem]">
			<table class="prospectus-table w-full text-center text-sm font-serif">
				{@render table_head()}
				{@render table_body(perksData.slice(splitAfterPerkGroups))}
			</table>
		</div>
	</div>

	<div class="mt-8 text-center font-serif text-lg max-w-4xl mx-auto text-[#3a2a1a]">
		<h3 class="font-bold">Have another idea?</h3>
		<p class="mt-2">
			We are eager to build custom sponsorship packages and are open to creative partnerships. If
			you have an idea that aligns with our mission, let's talk!
		</p>
	</div>
</section>

<style>
	table {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		font-size: 10pt;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 10px;
	}
</style>
