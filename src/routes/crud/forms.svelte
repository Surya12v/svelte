<script>
  import { goto } from '$app/navigation';
  export let formData = { name: '', email: '', age: '', message: '' };
  export let onSubmit;

  let localForm = { ...formData };
  $: localForm = { ...formData }; // reactive assignment to keep formData in sync
  function submitForm() {
    onSubmit(localForm);
  }
</script>

<form on:submit|preventDefault={submitForm}>
  <label>
    Name:
    <input type="text" bind:value={localForm.name} required />
  </label>

  <label>
    Email:
    <input type="email" bind:value={localForm.email} required />
  </label>

  <label>
    Age:
    <input type="number" bind:value={localForm.age} required />
  </label>

  <label>
    Message:
    <textarea bind:value={localForm.message}></textarea>
  </label>

  <button type="submit">Submit</button>
</form>
<style>
  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: auto;
  }
  label {
    margin-bottom: 10px;
  }
  input, textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    box-sizing: border-box;
  }
  button {
    margin-top: 10px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
</style>
