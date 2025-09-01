<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	
	/** @type {import('./$types').PageData} */
	export let data;
	
	let mapContainer: HTMLElement;
	let map: any;
	
	onMount(() => {
		if (browser) {
			// Mouse trail setup
			let mouseTrailPoints: Array<{ x: number; y: number }> = [];
			const maxTrailLength = 15;
			let animationId: number;
			
			// Rainbow trail configuration - adjust these to tune the effect
			const colorChangeSpeed = 400; // Lower = faster color changes (was 800)
			const trailColorSpan = 25; // Degrees of color variation across trail length (was 15)
			const trailThicknessStart = 3; // Path thickness at tail (oldest points)
			const trailThicknessEnd = 8; // Path thickness at mouse (newest points)
			
			function getHueFromIndex(index: number): number {
				return (index * 24) % 360; // Rainbow cycle through hues
			}
			
			function updateMouseTrail(e: MouseEvent) {
				// Get fresh references to all SVG containers
				const svgs = [
					document.querySelector('#trail-svg-blur'),
					// document.querySelector('#trail-svg-main')
				];
				if (svgs.find(svg => !svg)) return;
				
				const x = e.clientX;
				const y = e.clientY;
				
				mouseTrailPoints.push({ x, y });
				
				// Keep trail at max length
				if (mouseTrailPoints.length > maxTrailLength) {
					mouseTrailPoints.shift();
				}
				
				// Clear existing paths and gradients
				if (mouseTrailPoints.length > 1) {
					svgs.forEach((svg: any) => {
						// Clear old elements
						const oldPaths = svg.querySelectorAll('.trail-segment');
						const oldGradients = svg.querySelectorAll('.segment-gradient');
						oldPaths.forEach((path: any) => path.remove());
						oldGradients.forEach((grad: any) => grad.remove());
						
						// Ensure defs exists
						let defs = svg.querySelector('defs');
						if (!defs) {
							defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
							svg.appendChild(defs);
						}
					});
					
					// Create individual path segments with gradient colors
					for (let i = 0; i < mouseTrailPoints.length - 1; i++) {
						const progress = i / (mouseTrailPoints.length - 1);
						const nextProgress = (i + 1) / (mouseTrailPoints.length - 1);
						
						// Base color changes slowly over time, with subtle variations along trail
						const baseHue = getHueFromIndex(Date.now() / colorChangeSpeed);
						const hue1 = baseHue - (progress * trailColorSpan);
						const hue2 = baseHue - (nextProgress * trailColorSpan);
						
						// Create paths in all SVGs
						svgs.forEach((svg: any, svgIndex: number) => {
							if (!svg) return;
							
							const defs = svg.querySelector('defs');
							if (!defs) return;
							
							// Create gradient for this segment (unique ID per SVG)
							const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
							gradient.classList.add('segment-gradient');
							gradient.setAttribute('id', `segment-gradient-${svgIndex}-${i}`);
							gradient.setAttribute('x1', '0%');
							gradient.setAttribute('y1', '0%');
							gradient.setAttribute('x2', '100%');
							gradient.setAttribute('y2', '0%');
							
							const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
							stop1.setAttribute('offset', '0%');
							stop1.setAttribute('stop-color', `hsl(${hue1}, 70%, 60%)`);
							
							const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
							stop2.setAttribute('offset', '100%');
							stop2.setAttribute('stop-color', `hsl(${hue2}, 70%, 60%)`);
							
							gradient.appendChild(stop1);
							gradient.appendChild(stop2);
							defs.appendChild(gradient);
							
							// Create path with gradient stroke - bigger at mouse (newest), smaller at tail (oldest)
							const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
							path.classList.add('trail-segment');
							path.setAttribute('d', `M${mouseTrailPoints[i].x},${mouseTrailPoints[i].y} L${mouseTrailPoints[i + 1].x},${mouseTrailPoints[i + 1].y}`);
							path.setAttribute('stroke', `url(#segment-gradient-${svgIndex}-${i})`);
							path.setAttribute('stroke-width', `${trailThicknessStart + (trailThicknessEnd - trailThicknessStart) * progress}`);
							path.setAttribute('stroke-linecap', 'round');
							path.setAttribute('stroke-linejoin', 'round');
							path.setAttribute('fill', 'none');
							
							svg.appendChild(path);
						});
					}
				}
			}
			
			function clearMouseTrail() {
				mouseTrailPoints = [];
				const svgs = [
					document.querySelector('#trail-svg-blur'),
					// document.querySelector('#trail-svg-main')
				];
				svgs.forEach((svg: any) => {
					if (svg) {
						const oldPaths = svg.querySelectorAll('.trail-segment');
						oldPaths.forEach((path: any) => path.remove());
					}
				});
			}
			
			// Trail fade animation - only remove points every few frames
			let frameCount = 0;
			function animateTrail() {
				frameCount++;
				
				// Only remove points every 3 frames to slow down the fade
				if (frameCount % 3 === 0 && mouseTrailPoints.length > 0) {
					mouseTrailPoints.shift();
					
					// Redraw trail segments with updated colors
					const svgs = [
						document.querySelector('#trail-svg-blur'),
						// document.querySelector('#trail-svg-main')
					];
					if (mouseTrailPoints.length > 1 && !svgs.find(svg => !svg)) {
						svgs.forEach((svg: any) => {
							// Clear old elements
							const oldPaths = svg.querySelectorAll('.trail-segment');
							const oldGradients = svg.querySelectorAll('.segment-gradient');
							oldPaths.forEach((path: any) => path.remove());
							oldGradients.forEach((grad: any) => grad.remove());
							
							// Ensure defs exists
							let defs = svg.querySelector('defs');
							if (!defs) {
								defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
								svg.appendChild(defs);
							}
						});
						
						// Redraw segments with gradients
						for (let i = 0; i < mouseTrailPoints.length - 1; i++) {
							const progress = i / (mouseTrailPoints.length - 1);
							const nextProgress = (i + 1) / (mouseTrailPoints.length - 1);
							
							// Base color changes slowly over time, with subtle variations along trail
							const baseHue = getHueFromIndex(Date.now() / colorChangeSpeed);
							const hue1 = baseHue - (progress * trailColorSpan);
							const hue2 = baseHue - (nextProgress * trailColorSpan);
							
							// Create paths in all SVGs
							svgs.forEach((svg: any, svgIndex: number) => {
								if (!svg) return;
								
								const defs = svg.querySelector('defs');
								if (!defs) return;
								
								// Create gradient
								const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
								gradient.classList.add('segment-gradient');
								gradient.setAttribute('id', `segment-gradient-${svgIndex}-${i}`);
								gradient.setAttribute('x1', '0%');
								gradient.setAttribute('y1', '0%');
								gradient.setAttribute('x2', '100%');
								gradient.setAttribute('y2', '0%');
								
								const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
								stop1.setAttribute('offset', '0%');
								stop1.setAttribute('stop-color', `hsl(${hue1}, 70%, 60%)`);
								
								const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
								stop2.setAttribute('offset', '100%');
								stop2.setAttribute('stop-color', `hsl(${hue2}, 70%, 60%)`);
								
								gradient.appendChild(stop1);
								gradient.appendChild(stop2);
								defs.appendChild(gradient);
								
								// Create path - bigger at mouse (newest), smaller at tail (oldest)
								const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
								path.classList.add('trail-segment');
								path.setAttribute('d', `M${mouseTrailPoints[i].x},${mouseTrailPoints[i].y} L${mouseTrailPoints[i + 1].x},${mouseTrailPoints[i + 1].y}`);
								path.setAttribute('stroke', `url(#segment-gradient-${svgIndex}-${i})`);
								path.setAttribute('stroke-width', `${trailThicknessStart + (trailThicknessEnd - trailThicknessStart) * progress}`);
								path.setAttribute('stroke-linecap', 'round');
								path.setAttribute('stroke-linejoin', 'round');
								path.setAttribute('fill', 'none');
								
								svg.appendChild(path);
							});
						}
					}
				}
				
				animationId = requestAnimationFrame(animateTrail);
			}
			
			// Wait for DOM and get elements
			setTimeout(() => {
				const svgs = [
					document.querySelector('#trail-svg-blur'),
					// document.querySelector('#trail-svg-main')
				];
				
				if (!svgs.find(svg => !svg)) {
					// Event listeners
					document.addEventListener('mousemove', updateMouseTrail);
					document.addEventListener('mouseleave', clearMouseTrail);
					
					// Start animation loop
					animateTrail();
				}
			}, 100);
			
			// Initialize Leaflet
			import('leaflet').then((L) => {
				// Load CSS
				const link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
				document.head.appendChild(link);
				
				// Initialize map
				map = L.map(mapContainer, {
					minZoom: 2,
					maxZoom: 18
				}).setView([20, 0], 2);
				
				// Add tile layer with custom styling
				L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
					attribution: '© OpenStreetMap contributors © CARTO',
					detectRetina: true
				}).addTo(map);
				
				// Create custom icon using map-flag.png
				const flagIcon = L.icon({
					iconUrl: '/map-flag.png',
					iconSize: [32, 32],
					iconAnchor: [16, 32],
					popupAnchor: [0, -32]
				});
				
				// Add markers for each location (data is prerendered)
				data.locations.forEach((location: any) => {
					if (location.lat && location.lng) {
						const marker = L.marker([location.lat, location.lng], { icon: flagIcon })
							.addTo(map);
						
						// Create popup that shows on hover
						const popupContent = location.hasPage 
							? `${location.event_name}<br><span style="font-size: 12px; opacity: 0.5;">(Click to open website)</span>`
							: location.event_name;
						
						const popup = L.popup({
							closeButton: false,
							className: 'custom-popup'
						}).setContent(popupContent);
						
						marker.bindPopup(popup);
						
						// Show popup on hover, hide on mouseout
						marker.on('mouseover', () => {
							marker.openPopup();
						});
						marker.on('mouseout', () => {
							marker.closePopup();
						});
						
						// Only add click handler for events that have pages
						if (location.hasPage) {
							marker.on('click', () => {
								// If in iframe, post message to parent; otherwise navigate directly
								if (window.parent !== window) {
									window.parent.postMessage({ type: 'navigate', slug: location.slug }, '*');
								} else {
									window.location.href = `/${location.slug}`;
								}
							});
						}
					}
				});
			});
			
			// Cleanup function
			return () => {
				document.removeEventListener('mousemove', updateMouseTrail);
				document.removeEventListener('mouseleave', clearMouseTrail);
				if (animationId) {
					cancelAnimationFrame(animationId);
				}
			};
		}
	});
</script>

<svelte:head>
	<title>Daydream Events Map</title>
</svelte:head>

<!-- Mouse trailer SVGs -->
<!-- Background blurred layer -->
<!-- svelte-ignore component_name_lowercase -->
<svg id="trail-svg-blur" class="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]" style="filter: blur(10px); opacity: 0.75">
	<!-- Individual path segments will be added here dynamically -->
</svg>

<!-- Foreground sharp layer -->
<!-- svelte-ignore component_name_lowercase -->
<svg id="trail-svg-main" class="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]" style="filter: blur(3px) saturate(0) brightness(1000); opacity: 0.25">
	<!-- Individual path segments will be added here dynamically -->
</svg>

<div bind:this={mapContainer} class="w-full h-screen"></div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	
	/* Map container styling */
	:global(.leaflet-container) {
		background: linear-gradient(135deg, #CCF4FD 0%, #B8D9F8 100%) !important;
		border-radius: 16px !important;
		overflow: hidden !important;
	}
	
	/* Map controls styling */
	:global(.leaflet-control-zoom a) {
		background: #44DBC8 !important;
		border: 2px solid #3CC2AF !important;
		color: white !important;
		border-radius: 8px !important;
		box-shadow: 0 4px 12px rgba(68, 219, 200, 0.3) !important;
		transition: all 0.2s ease-in-out !important;
	}
	
	:global(.leaflet-control-zoom a:hover) {
		background: #3CC2AF !important;
		transform: translateY(-1px) !important;
		box-shadow: 0 6px 16px rgba(68, 219, 200, 0.4) !important;
	}
	
	:global(.leaflet-control-attribution) {
		background: rgba(252, 247, 196, 0.9) !important;
		border: 1px solid #D3B180 !important;
		border-radius: 8px !important;
		color: #78531D !important;
		font-family: 'Atkinson Hyperlegible', system-ui, sans-serif !important;
		backdrop-filter: blur(8px) !important;
		display: none !important;
	}
	
	:global(.leaflet-control-attribution a) {
		color: #4477A3 !important;
		text-decoration: none !important;
	}
	
	:global(.leaflet-control-attribution a:hover) {
		color: #44DBC8 !important;
	}
	
	/* Custom popup styling */
	:global(.custom-popup .leaflet-popup-content-wrapper) {
		background: #FFFBDF !important;
		border: 1px solid #D3B180 !important;
		border-radius: 8px !important;
		box-shadow: 0 4px 8px rgba(211, 177, 128, 0.15) !important;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
	}
	
	:global(.custom-popup .leaflet-popup-content) {
		margin: 8px 12px !important;
		color: #78531D !important;
		font-size: 14px !important;
		font-weight: 500 !important;
		line-height: 1.2 !important;
	}
	
	:global(.custom-popup .leaflet-popup-tip) {
		background: #FFFBDF !important;
		border: 1px solid #D3B180 !important;
		border-top: none !important;
		border-right: none !important;
	}
	
	/* Tile layer filter for softer appearance */
	:global(.leaflet-tile-pane) {
		filter: hue-rotate(5deg) saturate(0.8) brightness(1.1) !important;
	}
</style>
