import { loadAndGeocodeEvents } from '$lib/events';

export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		const locations = await loadAndGeocodeEvents();
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
