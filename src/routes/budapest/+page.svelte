<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		// Redirect to the external URL
		window.location.href = 'https://www.daydreambudapest.hu';
	});
</script>

<svelte:head>
	<title>Redirecting to Daydream Budapest...</title>
	<meta http-equiv="refresh" content="0; url=https://www.daydreambudapest.hu" />
</svelte:head>

<main>
	<div class="redirect-message">
		<h1>Redirecting to Daydream Budapest...</h1>
		<p>
			If you are not redirected automatically, <a href="https://www.daydreambudapest.hu"
				>click here</a
			>.
		</p>
	</div>
</main>

<style>
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		font-family: Arial, sans-serif;
	}

	.redirect-message {
		text-align: center;
		padding: 2rem;
	}

	h1 {
		margin-bottom: 1rem;
		color: #333;
	}

	a {
		color: #0066cc;
		text-decoration: underline;
	}

	a:hover {
		text-decoration: none;
	}
</style>
