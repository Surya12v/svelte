<script>
  import { onMount } from 'svelte';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  export let capitals = [];

  let map;

  onMount(() => {
    map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    capitals.forEach((capital) => {
      const marker = L.marker(capital.latlng).addTo(map);
      marker.bindPopup(`<strong>${capital.name}</strong><br>${capital.state}`).openPopup();
    });
  });
</script>

<style>
  #map {
    height:100vh;
    width: 100%;
  }
</style>

<div id="map"></div>
