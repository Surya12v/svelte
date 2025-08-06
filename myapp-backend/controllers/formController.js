const db = require('../db/db');
require('dotenv').config();

const table = process.env.DB_TABLE;

// CREATE
exports.createForm = (req, res) => {
    const { name, email, message, age } = req.body;
    const sql = `INSERT INTO ${table} (name, email, age, message) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, email, age, message], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });
        res.status(201).json({ id: result.insertId, name, email, age, message });
    });
};

// READ
exports.getForms = (req, res) => {
    const sql = `SELECT * FROM ${table}`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to retrieve forms', details: err });
        res.status(200).json(results);
    });
};

// UPDATE
exports.updateForm = (req, res) => {
    const { id } = req.params;
    const { name, email, age, message } = req.body;
    const sql = `UPDATE ${table} SET name = ?, email = ?, age = ?, message = ? WHERE id = ?`;
    db.query(sql, [name, email, age, message, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to update form', details: err });
        res.status(200).json({ message: 'Form updated', id });
    });
};

// DELETE
exports.deleteForm = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to delete form', details: err });
        res.status(200).json({ message: 'Form deleted', id });
    });
};
