const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: '*', // Vite frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use('/', require('./routes'));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
