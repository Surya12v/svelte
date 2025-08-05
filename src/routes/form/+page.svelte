<script>
  let name = '';
  let message = '';

  function handleSubmit() {
    if (name.trim() && message.trim()) {
      alert(`Name: ${name}\nMessage: ${message}`);
      name = '';
      message = '';
    } else {
      alert('Please fill in all fields.');
    }
  }
</script>

<style>
  .form-container {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    max-width: 400px;
    background-color: #f9f9f9;
  }

  .form-title {
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
  }

  .form-group input,
  .form-group textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 0.95rem;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 80px;
  }

  .form-actions {
    text-align: right;
  }

  .form-actions button {
    background-color: #0077ff;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .form-actions button:hover {
    background-color: #005dc1;
  }
</style>

<div class="form-container">
  <div class="form-title">Send a Message</div>
  
  <div class="form-group">
    <label for="name">Your Name</label>
    <input id="name" bind:value={name} placeholder="Enter your name" />
  </div>
  
  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" bind:value={message} placeholder="Type your message here..."></textarea>
  </div>
  
  <div class="form-actions">
    <button on:click={handleSubmit}>Submit</button>
  </div>
</div>
