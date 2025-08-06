const BASE = 'http://localhost:3000/api/chats';

export async function fetchMessages(p1, p2) {
  const res = await fetch(`${BASE}/${p1}/${p2}`);
  console.log('fetchMessages', res);
  return res.json();
}

export async function sendMessage(senderId, receiverId, message) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senderId, receiverId, message })
  });
  return res.json();
}
