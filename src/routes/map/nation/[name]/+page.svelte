<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  import nations from '../../../../lib/data/nations.json';

  let map;

  onMount(() => {
    const unsubscribe = page.subscribe(($page) => {
      const name = $page.params.name.toLowerCase();
      const nation = nations[name];

      if (!nation) {
        console.error('Nation not found:', name);
        return;
      }

      const latlngs = nation.latlngs;

      map = L.map('map').setView(latlngs[0], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const polygon = L.polygon(latlngs, { color: 'blue' }).addTo(map);

      const bounds = polygon.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds);
      } else {
        console.warn('Polygon bounds invalid:', bounds);
      }
    });

    return () => unsubscribe();
  });
</script>

<style>
  #map {
    height: 100vh;
    width: 100%;
  }
</style>

<div id="map"></div>
