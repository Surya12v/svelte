<!-- src/routes/map/nation/state/[name]/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import MapPolygon from '../../../MapPolygon.svelte';
  import states from '../../../../../lib/data/states.json';

  const coordinates = derived(page, ($page) => {
    const name = $page.params.name.toLowerCase();
    return states[name]?.coordinates || [];
  });
</script>

<MapPolygon {coordinates} color="green" />
