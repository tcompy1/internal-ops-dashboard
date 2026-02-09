
const express = require('express');
const app = express();
const PORT = 3000;

//Middleware
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

