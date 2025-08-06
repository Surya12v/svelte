const db = require('../db/db');

exports.sendMessage = (req, res) => {
  const { senderId, receiverId, message } = req.body;

  if (!senderId || !receiverId || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const query = 'INSERT INTO chats (sender_id, receiver_id, message) VALUES (?, ?, ?)';
  db.query(query, [senderId, receiverId, message], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, senderId, receiverId, message });
  });
};

exports.getMessages = (req, res) => {
  const { senderId, receiverId } = req.params;

  const query = `
    SELECT * FROM chats
    WHERE (sender_id = ? AND receiver_id = ?)
       OR (sender_id = ? AND receiver_id = ?)
    ORDER BY timestamp ASC
  `;

  db.query(query, [senderId, receiverId, receiverId, senderId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
