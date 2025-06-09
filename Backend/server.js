// require('dotenv').config();

const express = require('express');
const connectDB = require('./DB/db');
const path = require('path');
require('dotenv').config();

const app = express();
connectDB();
app.use(express.json());

const port = process.env.PORT || 5000;

// app.get('/', (req, res) => {
// 	res.send('Welcome to FormIt!');
// });
app.use('/api/users', require('./routes/api/users'));
app.use('/api/forms', require('./routes/api/forms'));
app.use('/api/responses', require('./routes/api/responses'));

// Serve static files from client/dist
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Fallback route for SPA (Vite build)
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
