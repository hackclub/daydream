<script lang="ts">
	export let tickerText: string;
</script>

<!-- Animated text ticker along curvy line -->
<div
	class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none lg:-translate-y-35 -translate-y-20 overflow-hidden max-md:w-200 max-lg:w-[125%]"
>
	<svg
		width="1280"
		height="464"
		viewBox="0 0 1280 464"
		class="w-full h-max pt-32 object-contain"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<path
				id="curvy-path"
				d="M-41 274.995C91.5 229.995 203.5 64.4946 483.5 39.9946C763.5 15.4946 892.5 151.495 1165 196.495C1383 232.495 1462.5 263.828 1475 274.995"
			/>
			<mask id="reveal-mask">
				<rect x="0" y="0" width="0" height="464" fill="white">
					<animate
						attributeName="width"
						values="0;1280"
						dur="2s"
						calcMode="spline"
						keySplines="0.05,0.7,0.3,1"
						keyTimes="0;1"
						begin="0.75s"
						fill="freeze"
					/>
				</rect>
			</mask>
		</defs>
		<g mask="url(#reveal-mask)">
			<!-- Background path stroke -->
			<path
				d="M-41 268.495C91.5 223.495 203.5 57.9946 483.5 33.4946C763.5 8.9946 892.5 144.995 1165 189.995C1383 225.995 1462.5 257.328 1475 268.495"
				stroke="#9EE4F2"
				stroke-width="28"
				fill="none"
				stroke-linecap="round"
			/>
			<text font-family="sans-serif" fill="#EDFCFF" font-weight="bold" font-size="18">
				<textPath href="#curvy-path" startOffset="-100%">
					{@html Array(2).fill(tickerText).join(' • ')} •
					<animate
						id="ticker-animation"
						attributeName="startOffset"
						values="-100%;0%"
						dur="30s"
						repeatCount="indefinite"
					/>
				</textPath>
			</text>
		</g>
	</svg>
</div>
