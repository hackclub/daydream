<script lang="ts">
	const scheduleData: { title: string; items: { event: string; time: string; }[] }[] = [
		{
			title: 'Sâmbătă, 27 septembrie',
			items: [
				{ event: 'Check-In', time: '09:30 - 10:30' },
				{ event: 'Ceremonia de deschidere și dezvăluirea temei', time: '10:30 - 11:00' },
				{ event: 'Startul oficial al hackathonului', time: '11:00' }
			]
		},
		{
			title: 'Duminică, 28 septembrie',
			items: [
				{ event: 'Finalizarea proiectelor', time: '11:00' },
				{ event: 'Prezentarea proiectelor', time: '11:00 - 13:00' },
				{ event: 'Premierea și festivitatea de încheiere', time: '15:00' }
			]
		}
	];
</script>

<div class="w-full bg-[#FCEFC5] py-16 px-8 flex justify-center">
	<div class="relative max-w-4xl w-full">
		<!-- Billboard Container -->
		<div
			class="relative bg-[#f0f9ff] border-[10px] border-b-[16px] border-[#888896] rounded-lg rounded-b-xl mx-auto z-40">
			<!-- Billboard Lights (top) -->
			<img
				src="/billboard-lights.png"
				alt=""
				class="absolute top-0 left-0 w-full h-auto object-contain pointer-events-none z-10 -translate-y-[calc(100%+9px)]"
			>

			<!-- Header Section -->
			<div class="w-full bg-[url('/billboard-bg-texture.png')] bg-contain bg-repeat py-6 relative"
					 style="border-bottom: 8px solid #B4B4C5;">
				<h2 class="text-4xl font-serif text-[#F0F0FF] text-center">
					Programul Hackathonului
				</h2>
				<!-- Brush texture overlay for header -->
				<div
					class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
			</div>

			<!-- Main Content Area -->
			<div class="relative bg-gradient-to-b from-[#CCF4FD] to-[#AECDF6] px-8 pt-8 pb-16">
				<!-- Brush texture overlay for content -->
				<div
					class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>

				<!-- Schedule Content -->
				<div class="relative z-10">
					{#each scheduleData as day, dayIndex}
						<div class="bg-white/50 py-6 -mx-8 {dayIndex < scheduleData.length - 1 ? 'mb-8' : ''}">
							<h3 class="text-2xl font-sans font-bold text-[#335969] mb-6 text-center px-8 max-sm:text-xl max-sm:px-4">
								{day.title}
							</h3>

							<div class="max-w-xl mx-auto px-4">
								{#each day.items as item, index}
									<div class="flex items-center justify-between py-2">
										<span class="text-lg font-sans text-[#477783]">{item.event}</span>
										<span class="text-lg font-sans text-[#477783]">{item.time}</span>
									</div>
									{#if index < day.items.length - 1}
										<div class="h-[2px] bg-white/30"></div>
									{/if}
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Billboard Bars (bottom) -->
			<div
				class="absolute bottom-0 -left-[5px] w-[calc(100%+10px)] h-6 bg-[url('/billboard-bars.png')] bg-repeat-x bg-contain bg-center pointer-events-none z-10 border-[#9898a7] border-x-[6px]"
			></div>
		</div>

		<!-- Billboard Pillars -->
		<div
			class="absolute top-1/2 left-[15%] w-[10vw] max-w-12 -bottom-12 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain"
			style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
		>
			<div
				class="absolute bottom-0 left-0 w-full h-auto bg-[url('/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"></div>
		</div>
		<div
			class="absolute top-1/2 right-[15%] w-[10vw] max-w-12 -bottom-12 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain"
			style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
		>
			<div
				class="absolute bottom-0 left-0 w-full h-auto bg-[url('/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"></div>
		</div>
	</div>
</div>