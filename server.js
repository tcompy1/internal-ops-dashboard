
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

//Middleware
app.use(express.json());

// Databse connection
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error connection to database', err);
    } else {
        console.log('Connected to SQLite databse');
    }
});

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Test route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
const requestsRoutes = require('./routes/requests');
app.use('/api/requests', requestsRoutes);
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

