import { GEOCODER_API_KEY } from '$env/static/private';

export const prerender = false;

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const location = url.searchParams.get('location');

	if (!GEOCODER_API_KEY || !location) {
		return {
			location: null,
			geocoded: null
		};
	}

	try {
		// Geocode the provided location
		const geocodeUrl = `https://geocoder.hackclub.com/v1/geocode?address=${encodeURIComponent(location)}&key=${GEOCODER_API_KEY}`;
		const geocodeResponse = await fetch(geocodeUrl);

		if (geocodeResponse.ok) {
			const geocodeData = await geocodeResponse.json();
			return {
				location,
				geocoded: {
					lat: geocodeData.lat,
					lng: geocodeData.lng,
					address: location
				}
			};
		} else {
			console.error(`Failed to geocode ${location}: ${geocodeResponse.status}`);
		}
	} catch (error) {
		console.error(`Failed to geocode ${location}:`, error);
	}

	return {
		location,
		geocoded: null
	};
}
