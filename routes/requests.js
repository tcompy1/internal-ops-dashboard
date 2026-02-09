
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

// UPDATE a request
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!title || !status) {
        return res.status(400).json({ error: 'Title and status are required' });
    }

    const query = `
    UPDATE requests
    SET title = ?, description = ?, status = ?
    WHERE id = ?
    `;

    db.run(query, [title, description, status, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.mnessage });
        }

        res.json({ id, title, description, status });
    });
});

// DELETE a request
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM requests WHERE id = ?';

    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.chages === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }

        res.json({ message: `Request ${id} deleted successfully` });
    });
});

// EXPORT requests as CSV
const { Parser } = require('json2csv');

router.get('/export/csv', (req, res) => {
    const query = 'SELECT * FROM requests';

    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        try {
            const parser = new Parser();
            const csv = parser.parse(rows);

            res.header('Content-Type', 'text/csv');
            res.attachment('requests.csv');
            res.send(csv);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
});

module.exports = router;