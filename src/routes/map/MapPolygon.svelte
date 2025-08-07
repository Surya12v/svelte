<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  export let coordinates = []; // can be store or raw array
  export let color = 'blue';

  let map;

  onMount(() => {
    let coords = Array.isArray(coordinates) ? coordinates : get(coordinates);

    if (!coords || coords.length === 0) {
      console.warn('No coordinates provided to MapPolygon');
      return;
    }

    map = L.map('map').setView(coords[0], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const polygon = L.polygon(coords, { color }).addTo(map);

    const bounds = polygon.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds);
    } else {
      console.warn('Invalid bounds from polygon');
    }
  });
</script>
<div id="map"></div>
<style>
  #map {
    height: 100vh;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
</style>