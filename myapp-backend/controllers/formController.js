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
// exports.getForms = (req, res) => {
//     const sql = `SELECT * FROM ${table}`;
//     db.query(sql, (err, results) => {
//         if (err) return res.status(500).json({ error: 'Failed to retrieve forms', details: err });
//         res.status(200).json(results);
//     });
// };
exports.getForms = (req, res) => {
  const { column, operator, value } = req.query;

  const allowedColumns = ['name', 'email', 'age', 'message'];
  const allowedOperators = ['=', '!=', '<', '>', '<=', '>=', 'contains'];
  // If no filter params, return all
  if (!column || !operator || typeof value === 'undefined') {
    const sql = `SELECT * FROM ${table}`;
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: 'Failed to retrieve forms', details: err });
      res.status(200).json(results);
    });
    return;
  }

  // Validation
  if (!allowedColumns.includes(column) || !allowedOperators.includes(operator)) {
    return res.status(400).json({ error: 'Invalid filter parameters' });
  }

  const sqlOperator = operator === 'contains' ? 'LIKE' : operator;
  const paramValue =
    operator === 'contains'
      ? `%${value}%`
      : ['age'].includes(column)
      ? Number(value)
      : value;

  const sql = `SELECT * FROM ${table} WHERE ${column} ${sqlOperator} ?`;

  db.query(sql, [paramValue], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve filtered forms', details: err });
    res.status(200).json(results);
  });
};



exports.getForm = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM ${table} WHERE id = ?`;
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to retrieve form', details: err });
        if (results.length === 0) return res.status(404).json({ error: 'Form not found' });
        res.status(200).json(results[0]);
    });
};

// UPDATE
exports.updateForm = (req, res) => {
    const { id } = req.params;
    const { name, email, age, message } = req.body;
    console.log(`Updating form with id: ${id}`, { name, email, age, message });
    const sql = `UPDATE ${table} SET name = ?, email = ?, age = ?, message = ? WHERE id = ?`;
    db.query(sql, [name, email, age, message, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to update form', details: err });
        console.log(`Form with id ${id} updated successfully`);
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
