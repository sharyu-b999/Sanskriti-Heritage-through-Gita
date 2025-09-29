const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Read the data from data.json
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

// Serve static frontend files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));

// API endpoint to get all data
app.get('/api/data', (req, res) => {
  res.json(data);
});

// API endpoint for Daily Wisdom
app.get('/api/daily-wisdom', (req, res) => {
  res.json(data.daily_wisdom);
});

// API endpoint to get all teachings
app.get('/api/teachings', (req, res) => {
  res.json(data.teachings);
});

// API endpoint to get all explore traditions
app.get('/api/explore', (req, res) => {
  res.json(data.explore);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Serving frontend from:', path.join(__dirname, 'frontend'));
});