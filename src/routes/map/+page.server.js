import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, GEOCODER_API_KEY } from '$env/static/private';

export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !GEOCODER_API_KEY) {
		return {
			locations: []
		};
	}

	try {
		// Fetch all approved events from Airtable with pagination
		const events = [];
		let offset = null;
		
		do {
			const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/events?filterByFormula={triage_status}="Approved"${offset ? `&offset=${offset}` : ''}`;
			const airtableResponse = await fetch(airtableUrl, {
				headers: {
					'Authorization': `Bearer ${AIRTABLE_API_KEY}`
				}
			});

			if (!airtableResponse.ok) {
				throw new Error(`Airtable API error: ${airtableResponse.status}`);
			}

			const airtableData = await airtableResponse.json();
			events.push(...airtableData.records);
			offset = airtableData.offset;
		} while (offset);

		// Geocode each event location
		const locations = [];
		for (const event of events) {
			const { location, state, country, event_name, address_override } = event.fields;
			
			if (!location || !event_name) continue;

			// Use address_override if set, otherwise build address string
			const address = address_override || [location, state, country].filter(Boolean).join(', ');
			console.log(`${event_name}: ${address}`)

			try {
				const geocodeUrl = `https://geocoder.hackclub.com/v1/geocode?address=${encodeURIComponent(address)}&key=${GEOCODER_API_KEY}`;
				const geocodeResponse = await fetch(geocodeUrl);

				if (geocodeResponse.ok) {
					const geocodeData = await geocodeResponse.json();
					locations.push({
						lat: geocodeData.lat,
						lng: geocodeData.lng,
						event_name,
						city: location,
						state,
						country
					});
				}
			} catch (error) {
				console.error(`Failed to geocode ${address}:`, error);
			}
		}

		return {
			locations
		};
	} catch (error) {
		console.error('Failed to fetch map data:', error);
		return {
			locations: []
		};
	}
}
