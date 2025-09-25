import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Add CORS headers for all requests
	response.headers.set('Access-Control-Allow-Origin', '*');
	response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	// Specific headers for font files and static assets
	if (event.url.pathname.includes('/fonts/') || 
		event.url.pathname.includes('/static/') ||
		event.url.pathname.match(/\.(woff|woff2|ttf|otf|eot|css|js|png|jpg|jpeg|gif|svg)$/)) {
		response.headers.set('Access-Control-Allow-Origin', '*');
		response.headers.set('Cache-Control', 'public, max-age=31536000');
	}

	return response;
};
