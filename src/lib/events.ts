import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, GEOCODER_API_KEY } from '$env/static/private';
import { readdir } from 'fs/promises';
import { join } from 'path';

interface EventFields {
	location: string;
	state?: string;
	country?: string;
	event_name: string;
	address_override?: string;
	slug?: string;
}

interface AirtableRecord {
	id: string;
	fields: EventFields;
}

interface AirtableResponse {
	records: AirtableRecord[];
	offset?: string;
}

interface GeocodeResponse {
	lat: number;
	lng: number;
}

export interface EventLocation {
	lat: number;
	lng: number;
	event_name: string;
	city: string;
	state?: string;
	country?: string;
	slug?: string;
	hasPage: boolean;
}

export interface EventLocationWithDistance extends EventLocation {
	distance: number;
}

// Cache to avoid multiple geocoding during build
let cachedEvents: EventLocation[] | null = null;

// Airtable client for updating records
import Airtable from 'airtable';
let airtableBase: any = null;
if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
	airtableBase = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
}

export async function loadAndGeocodeEvents(): Promise<EventLocation[]> {
	// do nothing if the API keys aren't set
	if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !GEOCODER_API_KEY) {
		return [];
	}
	
	if (cachedEvents) {
		return cachedEvents;
	}

	if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !GEOCODER_API_KEY) {
		cachedEvents = [];
		return cachedEvents;
	}

	console.log("Geocoding all events")

	try {
		// Get all existing route directories to check which pages exist
		const routesPath = join(process.cwd(), 'src', 'routes');
		const existingRoutes = await readdir(routesPath);
		
		// Fetch all approved events from Airtable with pagination
		const events: AirtableRecord[] = [];
		let offset: string | null = null;
		
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

			const airtableData: AirtableResponse = await airtableResponse.json();
			events.push(...airtableData.records);
			offset = airtableData.offset || null;
		} while (offset);

		// Geocode each event location and update Airtable
		const locations: EventLocation[] = [];
		const updatePromises: Promise<void>[] = [];
		
		for (const event of events) {
			const { location, state, country, event_name, address_override, slug } = event.fields;
			
			if (!location || !event_name) continue;

			// Use address_override if set, otherwise build address string
			const address = address_override || [location, state, country].filter(Boolean).join(', ');
			console.log(`${event_name} [${slug}]: ${address}`)

			try {
				const geocodeUrl = `https://geocoder.hackclub.com/v1/geocode?address=${encodeURIComponent(address)}&key=${GEOCODER_API_KEY}`;
				const geocodeResponse = await fetch(geocodeUrl);

				if (geocodeResponse.ok) {
					const geocodeData: GeocodeResponse = await geocodeResponse.json();
					// Check if a page exists for this slug
					const hasPage = slug ? existingRoutes.includes(slug) : false;
					
					// Update Airtable record with has_website field if it differs from hasPage
					if (airtableBase && slug && hasPage) {
						const updatePromise = airtableBase('events').update([
							{
								id: event.id,
								fields: {
									has_website: true
								}
							}
						]).catch((error: any) => {
							console.error(`Failed to update has_website for ${slug}:`, error);
						});
						updatePromises.push(updatePromise);
					}
					
					locations.push({
						lat: geocodeData.lat,
						lng: geocodeData.lng,
						event_name,
						city: location,
						state,
						country,
						slug,
						hasPage
					});
				}
			} catch (error) {
				console.error(`Failed to geocode ${address}:`, error);
			}
		}
		
		// Wait for all Airtable updates to complete
		if (updatePromises.length > 0) {
			console.log(`Updating ${updatePromises.length} events with has_website=true`);
			await Promise.allSettled(updatePromises);
		}

		cachedEvents = locations;
		return locations;
	} catch (error) {
		console.error('Failed to fetch event data:', error);
		cachedEvents = [];
		return [];
	}
}

// Haversine formula to calculate distance between two points in miles
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
	const R = 3959; // Earth's radius in miles
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLng = (lng2 - lng1) * Math.PI / 180;
	const a = 
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
		Math.sin(dLng / 2) * Math.sin(dLng / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Distance in miles
}
