<script>
  import Form from '../forms.svelte';
  import { createForm } from '$lib/api';
  import { goto } from '$app/navigation';

  async function handleSubmit(data) {
    console.log('Creating new form with data:', data); // Debugging log
    await createForm(data);
    history.back();
  }
</script>

<h2>Create New Form</h2>
<Form onSubmit={handleSubmit} /> 
