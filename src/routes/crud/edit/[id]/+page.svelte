<script>
  import { onMount } from 'svelte';
  import { getForm, updateForm } from '../../../../lib/api.js';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import NewForm from '../../forms.svelte'; // ✅ Capitalized for component naming

  let id;
  let data = { name: '', email: '', age: '', message: '' }; // ✅ Updated fields

  $: id = $page.params.id; // reactive assignment

  onMount(async () => {
    data = await getForm(id);
    console.log('Fetched data:', data); // Debugging log
  });

  async function handleSubmit(updatedData) {
    console.log('Updated data:', updatedData); // Debugging log
    await updateForm(id, updatedData);
    goto('/crud'); // ✅ Update path to /crud
    // OR: history.back(); if you prefer dynamic back
  }
</script>

<h2>Edit Form</h2>
<NewForm formData={data} onSubmit={handleSubmit} />

