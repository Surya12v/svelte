<script>
	import { onMount } from 'svelte';
	let name = '';
	let email = '';
	let message = '';
  let age = '';
	let forms = [];
	let editingId = null; // Track which form is being edited
	const API = 'http://localhost:3000'; // Backend URL
	
	const fetchForms = async () => {
		const res = await fetch(`${API}/api/forms/`);
		forms = await res.json();
    console.log('Fetched forms:', forms);
	};
	
	const handleSubmit = async () => {
		if (editingId) {
      console.log('Editing existing form:', editingId);
			// Update existing form
			const res = await fetch(`${API}/api/forms/${editingId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, age, message })
			});
			const data = await res.json();
			
			// Update the form in the list
			forms = forms.map(form => 
				form.id === editingId 
					? { ...form, name: data.name, email: data.email,age:data.age, message: data.message }
					: form
			);
			
			// Reset to create mode
			editingId = null;
      fetchForms(); // Refresh the list
		} else {
      console.log('Creating new form');
			// Create new form
			const res = await fetch(`${API}/api/forms/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, age, message })
			});
			const data = await res.json();
			forms = [...forms, data];
		}
		
		// Clear form fields
		name = email = age = message = '';
	};
	
	const deleteForm = async (id) => {
		await fetch(`${API}/api/forms/${id}`, { method: 'DELETE' });
		forms = forms.filter((form) => form.id !== id);
		
		// If we're currently editing the deleted form, reset to create mode
		if (editingId === id) {
			editingId = null;
			name = email = age = message = '';
		}
	};
	
	const enableEdit = (form) => {
		// Load form data into the main form
		name = form.name;
		email = form.email;
    age = form.age;
		message = form.message;
		editingId = form.id;
	};
	
	const cancelEdit = () => {
		// Reset to create mode
		editingId = null;
		name = email = age = message = '';
	};
	
	onMount(fetchForms);
</script>

<h1>{editingId ? 'Update' : 'Submit Your'} Info</h1>

<form on:submit|preventDefault={handleSubmit}>
	<input bind:value={name} placeholder="Name" required />
	<input type="email" bind:value={email} placeholder="Email" required />
  <input type="number" bind:value={age} placeholder="Age" />
	<textarea bind:value={message} placeholder="Message"></textarea>
	<div class="form-buttons">
		<button type="submit">{editingId ? '✅ Update' : '📝 Submit'}</button>
		{#if editingId}
			<button type="button" on:click={cancelEdit}>❌ Cancel</button>
		{/if}
	</div>
</form>

<hr />

<h2>Submissions</h2>
{#each forms as form (form.id)}
	<div class="submission-card {editingId === form.id ? 'editing' : ''}">
		<p><strong>Name: {form.name}</strong></p>
    <p><strong>Email:</strong> {form.email}</p>
    <p><strong>Age:</strong> {form.age}</p>
		<p><strong>Message:</strong> {form.message} </p>
		<div class="card-buttons">
			<button on:click={() => enableEdit(form)} disabled={editingId === form.id}>
				✏️ Edit
			</button>
			<button on:click={() => deleteForm(form.id)}>🗑 Delete</button>
		</div>
	</div>
{/each}

<style>
	form {
	max-width: 600px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 15px;
	padding: 20px;
}

input,
textarea {
	width: 100%;
	max-width: 400px;
	padding: 12px;
	font-size: 16px;
	border: 1px solid #ddd;
	border-radius: 6px;
	text-align: center;
}

.form-buttons,
.card-buttons {
	display: flex;
	justify-content: center;
	gap: 10px;
	flex-wrap: wrap;
}

button {
	padding: 12px 20px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	font-size: 14px;
	min-width: 80px;
}

button:hover:not(:disabled) {
	background-color: #0056b3;
}

button:disabled {
	background-color: #6c757d;
	cursor: not-allowed;
}

button[type="button"] {
	background-color: #6c757d;
}

button[type="button"]:hover {
	background-color: #5a6268;
}

hr {
	width: 100%;
	max-width: 600px;
	margin: 30px auto;
	border: none;
	border-top: 1px solid #ddd;
}

.submission-card {
	max-width: 600px;
	margin: 0 auto 15px auto;
	border: 1px solid #ccc;
	padding: 20px;
	border-radius: 6px;
	background-color: #f8f9fa;
	text-align: center;
}

.submission-card.editing {
	border-color: #007bff;
	background-color: #e3f2fd;
}

p {
	margin: 8px 0;
}

strong {
	font-weight: bold;
}
</style>