<script>
	import { onMount } from 'svelte';
	let isBrowser = false;

	onMount(() => {
		isBrowser = true;
	});

	import Map from './Map.svelte';
</script>

{#if isBrowser}
	<Map />
{:else}
	<p>Loading map…</p>
{/if}
