import Airtable from 'airtable';
import { json } from '@sveltejs/kit';
// import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_RSVPS_TABLE } from '$env/static/private';
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_RSVPS_TABLE } = process.env; 

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
	console.warn('Airtable environment variables not configured, email saving will be skipped');
}

const base = AIRTABLE_API_KEY && AIRTABLE_BASE_ID 
	? new Airtable({
		apiKey: AIRTABLE_API_KEY
	}).base(AIRTABLE_BASE_ID)
	: null;

export async function POST({ request, getClientAddress }) {
	try {
		const { email, city } = await request.json();
		
		if (!email) {
			return json({ error: 'Email is required' }, { status: 400 });
		}
		
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ error: 'Invalid email format' }, { status: 400 });
		}
		
		// get IP address
		const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || getClientAddress();
		
		if (base) {
			await base(AIRTABLE_RSVPS_TABLE || 'participant_rsvps').create([
				{
					fields: {
						email,
						ip,
						city,
					}
				}
			]);
		}
		
		return new Response(null, { status: 200 });
		
	} catch (error) {
		console.error('Error saving email to Airtable:', error);
		
		return new Response(null, { status: 418 });
	}
}
