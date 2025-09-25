import { GEOCODER_API_KEY } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, getClientAddress }) {
	// Get user's IP address
	const userIP = getClientAddress();
	
	
	let locationData = null;
	
	if (GEOCODER_API_KEY && userIP) {
		try {
			// Call the Hack Club geocoding API
			const response = await fetch(`https://geocoder.hackclub.com/v1/geoip?ip=${userIP}&key=${GEOCODER_API_KEY}`);
			
			if (response.ok) {
				locationData = await response.json();
			}
		} catch (error) {
			console.error('Failed to fetch location data:', error);
		}
	}

	return {
		userCity: locationData?.city
	};
}
