<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Daydream Vienna</title>
	<meta name="description" content="Ein einfaches Daydream Event in Vienna" />
</svelte:head>

{@render children()}
