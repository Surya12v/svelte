<script>
	import { onMount } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	let map;

	onMount(() => {
		map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; OpenStreetMap contributors'
		}).addTo(map);

		L.marker([20.5937, 78.9629])
			.addTo(map)
			.bindPopup('Hello from India 🇮🇳')
			.openPopup();
	});
</script>

<style>
	#map {
		height: 100vh;
		width: 100%;
		border-radius: 10px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	}
</style>

<div id="map"></div>
