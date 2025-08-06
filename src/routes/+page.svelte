<script>
  import { onMount } from 'svelte';
  import { sendMessage, fetchMessages } from '$lib/api.js';

  let p1Message = "";
  let p2Message = "";

  let p1Chats = [];
  let p2Chats = [];

  const p1 = 1;
  const p2 = 2;

  async function loadChats() {
    const data = await fetchMessages(p1, p2);
    
    p1Chats = data.map(d => ({ from: d.sender_id === p1 ? 'p1' : 'p2', text: d.message }));
    p2Chats = data.map(d => ({ from: d.sender_id === p2 ? 'p2' : 'p1', text: d.message }));
  }

  async function sendP1() {
    if (p1Message.trim()) {
      await sendMessage(p1, p2, p1Message);
      p1Message = "";
      await loadChats();
    }
  }

  async function sendP2() {
    if (p2Message.trim()) {
      await sendMessage(p2, p1, p2Message);
      p2Message = "";
      await loadChats();
    }
  }

  onMount(() => {
    loadChats();
  });
</script>
<div class="container">
  <div class="chat-box">
    <h3>Person 1</h3>
    <div class="chat-window">
      {#each p1Chats as chat}
        <div class="chat-message {chat.from === 'p1' ? 'right' : 'left'}">{chat.text}</div>
      {/each}
    </div>
    <div class="input-group">
      <input bind:value={p1Message} placeholder="Type a message..." />
      <button on:click={sendP1}>Send</button>
    </div>
  </div>

  <div class="chat-box">
    <h3>Person 2</h3>
    <div class="chat-window">
      {#each p2Chats as chat}
        <div class="chat-message {chat.from === 'p2' ? 'right' : 'left'}">{chat.text}</div>
      {/each}
    </div>
    <div class="input-group">
      <input bind:value={p2Message} placeholder="Type a message..." />
      <button on:click={sendP2}>Send</button>
    </div>
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f3f4f6;
    margin: 0;
    padding: 2rem;
  }

  .container {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }

  .chat-box {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    width: 320px;
    display: flex;
    flex-direction: column;
  }

  .chat-window {
    flex: 1;
    border-radius: 8px;
    padding: 1rem;
    height: 350px;
    overflow-y: auto;
    background-color: #f9fafb;
    margin-bottom: 1rem;
  }

  .chat-message {
    max-width: 70%;
    padding: 0.5rem 0.75rem;
    border-radius: 18px;
    margin: 0.4rem 0;
    font-size: 0.9rem;
    line-height: 1.3;
    word-wrap: break-word;
  }

  .right {
    align-self: flex-end;
    background-color: #4f46e5;
    color: white;
    border-bottom-right-radius: 4px;
  }

  .left {
    align-self: flex-start;
    background-color: #e5e7eb;
    color: #111827;
    border-bottom-left-radius: 4px;
  }

  input {
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    flex: 1;
  }

  button {
    margin-left: 0.5rem;
    padding: 0.5rem 0.75rem;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s ease;
  }

  button:hover {
    background-color: #4338ca;
  }

  .input-group {
    display: flex;
  }

  h3 {
    margin-top: 0;
    font-size: 1.1rem;
    text-align: center;
    color: #374151;
  }
</style>



