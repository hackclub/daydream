export async function load({ fetch, setHeaders }) {
	try {
		const response = await fetch('https://byteatatime.dev/static/daydreamsf.json');

		if (!response.ok) {
			console.error('Failed to fetch SF event data:', response.status);
			return { sf_data: null, error: `Failed to load event data. Status: ${response.status}` };
		}

		const sf_data = await response.json();

		setHeaders({
			'cache-control': 'public, max-age=3600'
		});

		return { sf_data };
	} catch (error) {
		console.error('Error fetching SF event data:', error);
		return { sf_data: null, error: 'Could not fetch event data.' };
	}
}
