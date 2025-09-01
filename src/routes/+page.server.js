import { GEOCODER_API_KEY, STATIC_PREVIEW } from '$env/static/private';
import { loadAndGeocodeEvents, calculateDistance } from '$lib/events';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, getClientAddress }) {
	if (STATIC_PREVIEW === "true") return {
		nearestEvent: null
	}

	// Get user's IP address
	const userIP = getClientAddress();
	
	let locationData = null;
	let nearestEvent = null;
	
	if (GEOCODER_API_KEY && userIP) {
		try {
			// Call the Hack Club geocoding API
			const response = await fetch(`https://geocoder.hackclub.com/v1/geoip?ip=${userIP}&key=${GEOCODER_API_KEY}`);
			
			if (response.ok) {
				locationData = await response.json();
				
				// If we have user coordinates, find nearest event
				if (locationData?.lat && locationData?.lng) {
					const events = await loadAndGeocodeEvents();
					let minDistance = Infinity;
					let closest = null;
					
					for (const event of events) {
						const distance = calculateDistance(
							locationData.lat, 
							locationData.lng, 
							event.lat, 
							event.lng
						);
						
						if (distance < minDistance) {
							minDistance = distance;
							closest = { ...event, distance };
						}
					}
					
					// Only show event if within 50 miles
					if (closest && closest.distance <= 50) {
						nearestEvent = closest;
					}
				}
			}
		} catch (error) {
			console.error('Failed to fetch location data:', error);
		}
	}

	return {
		nearestEvent
	};
}
