<script>
  import { onMount } from 'svelte';
  import { getForms, deleteForm, getFormsearch } from '../../lib/api.js';

  let forms = [];
  let column = 'name';
  let operator = 'contains';
  let value = '';
  const columns = ['name', 'email', 'age', 'message'];
  const operators = ['contains', '=', '!=', '<', '<=', '>', '>='];

  let mounted = false; // guard against SSR

  async function loadForms() {
    forms = await getForms();
  }

  async function handleDelete(id) {
    await deleteForm(id);
    loadForms();
  }

  async function handleSearch() {
    if (!mounted) return; // skip during SSR
    if (value.trim() === '') {
      await loadForms();
    } else {
      const query = { column, operator, value };
      console.log('Searching with query:', query);
      forms = await getFormsearch(query);
    }
  }

  onMount(() => {
    mounted = true;
    loadForms(); // Load initial forms
    handleSearch(); // Initial call on mount
  });

  // Continual auto-search (only after mount)
  $: if (mounted && (column || operator || value)) {
    handleSearch();
  }
</script>


<h1>Form Entries</h1>

<div style="display: flex; gap: 10px; margin-bottom: 10px;">
  <select bind:value={column}>
    {#each columns as col}
      <option value={col}>{col}</option>
    {/each}
  </select>

  <select bind:value={operator}>
    {#each operators as op}
      <option value={op}>{op}</option>
    {/each}
  </select>

  <input type="text" bind:value={value} placeholder="Enter value" />

  <button on:click={() => goto('crud/create')}>+ New Entry</button>
</div>


<table>
  <thead>
    <tr>
      <th>Name</th><th>Email</th><th>Age</th><th>Message</th><th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each forms as form}
      <tr>
        <td>{form.name}</td>
        <td>{form.email}</td>
        <td>{form.age}</td>
        <td>{form.message}</td>
        <td>
          <button on:click={() => goto(`crud/edit/${form.id}`)}>Edit</button>
          <button on:click={() => handleDelete(form.id)}>Delete</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  button {
    margin-right: 5px;
  }
  input {
    padding: 5px;
    width: 200px;
  }
  button {
    padding: 5px 10px;
    cursor: pointer;
  }
  button:hover {
    background-color: #ddd;
  }
</style>