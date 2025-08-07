const BASE = 'http://localhost:3000/api/chats';
const API = 'http://localhost:3000/api/forms';

export async function fetchMessages(p1, p2) {
  const res = await fetch(`${BASE}/${p1}/${p2}`);
  
  if (!res.ok) {
    console.error('Failed to fetch messages:', res.status);
    return [];
  }

  const data = await res.json();
  console.log('fetchMessages data:', data); 
  return data;
}


export async function sendMessage(senderId, receiverId, message) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senderId, receiverId, message })
  });
    if (!res.ok) {
    console.error('Failed to send message:', res.status);
    return null;
    }
  return res.json();
}
export async function getForms() {
  return fetch('/api/forms').then(res => res.json());
}

export async function getFormsearch({ column, operator, value }) {
  const params = new URLSearchParams({ column, operator, value });

  console.log(`Fetching forms with search params: ${params.toString()}`);

  const res = await fetch(`/api/forms?${params.toString()}`);

  if (!res.ok) {
    console.error(`Fetch error: ${res.status} ${res.statusText}`);
    return [];
  }

  const data = await res.json();
  console.log('Search response data:', data);
  return data;
}



export async function getForm(id) {
  console.log(`Fetching form with id: ${id}`);
  return fetch(`/api/forms/${id}`).then(res => res.json());
}

export async function fetchForms() {
	const res = await fetch(`${API}/`);
	return await res.json();
}

export async function createForm(data) {
  console.log('Creating new form with data:', data); // Debugging log
	const res = await fetch(`${API}/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	return await res.json();
}

export async function updateForm(id, data) {
  console.log(`Updating form with id: ${id}`, data);
	const res = await fetch(`${API}/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	return await res.json();
}

export async function deleteForm(id) {
	await fetch(`${API}/${id}`, { method: 'DELETE' });
}
