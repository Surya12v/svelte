<script>
  import { onMount } from 'svelte';
  import { sendMessage, fetchMessages } from '$lib/api.js';

  let p1Message = "";
  let p2Message = "";

  let p1Chats = [];
  let p2Chats = [];

  const p1 = 1;
  const p2 = 2;
  let chatWindow1;
  let chatWindow2;

  function formatTime(iso) {
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  async function loadChats() {
    const data = await fetchMessages(p1, p2);

    p1Chats = data.map((d) => ({
      from: d.sender_id === p1 ? 'p1' : 'p2',
      text: d.message,
      time: d.timestamp ? formatTime(d.timestamp) : ''
    }));

    p2Chats = data.map((d) => ({
      from: d.sender_id === p2 ? 'p2' : 'p1',
      text: d.message,
      time: d.timestamp ? formatTime(d.timestamp) : ''
    }));
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
    <div class="chat-window" bind:this={chatWindow1}>
      {#each p1Chats as chat}
        <div class="chat-bubble {chat.from === 'p1' ? 'right' : 'left'}">
          <div class="chat-message">
            <span>{chat.text}</span>
            <span class="timestamp">{chat.time}</span>
          </div>
        </div>
      {/each}
    </div>
    <div class="input-group">
      <input bind:value={p1Message} placeholder="Type a message..." />
      <button on:click={sendP1}>Send</button>
    </div>
  </div>

  <div class="chat-box">
    <h3>Person 2</h3>
    <div class="chat-window" bind:this={chatWindow2}>
      {#each p2Chats as chat}
        <div class="chat-bubble {chat.from === 'p2' ? 'right' : 'left'}">
          <div class="chat-message">
            <span>{chat.text}</span>
            <span class="timestamp">{chat.time}</span>
          </div>
        </div>
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
    background: #dcdcdc;
    margin: 0;
    padding: 2rem;
  }

  .container {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .chat-box {
    background-color: #e5ddd5;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    width: 800px;
    height: 880px;
    display: flex;
    flex-direction: column;
  }

  .chat-window {
    border-radius: 8px;
    padding: 1rem;
    overflow-y: auto;
    background-color: #fafafa;
    margin-bottom: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .chat-bubble {
    display: flex;
    flex-direction: column;
    margin: 6px 0;
  }

  .chat-bubble.right {
    align-items: flex-end;
  }

  .chat-bubble.left {
    align-items: flex-start;
  }

  .chat-message {
    position: relative;
    background-color: #ddf8c8;
    color: #111;
    padding: 10px 14px 20px 14px;
    border-radius: 16px;
    width: 25%;
    word-wrap: break-word;
    font-size: 0.75rem;
    line-height: 1.4;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    white-space: pre-wrap;
  }

  .chat-bubble.left .chat-message {
    background-color: #ffffff;
  }

  .timestamp {
    position: absolute;
    bottom: 4px;
    right: 10px;
    font-size: 0.65rem;
    color: #555;
    opacity: 0.6;
  }

  .input-group {
    display: flex;
    height: 40px;
    padding: 0.25rem;
    background-color: #f0f0f0;
    border-radius: 8px;
  }

  input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    background-color: #fff;
  }

  button {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #25d366;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s ease;
  }

  button:hover {
    background-color: #20c05c;
  }

  h3 {
    margin-top: 0;
    font-size: 1.1rem;
    text-align: center;
    color: #075e54;
  }
</style>
