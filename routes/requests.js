
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('./database.db');

// GET all requests
router.get('/', (req, res) => {
    const query = 'SELECT * FROM requests';

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// CREATE a new request
router.post('/', (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const query = `
    INSERT INTO requests (title, description)
    VALUES (?, ?)
    `;
    
    db.run(query, [title, description], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            id: this.lastID,
            title,
            description,
            status: 'Open'
        });
    });
});

module.exports = router;