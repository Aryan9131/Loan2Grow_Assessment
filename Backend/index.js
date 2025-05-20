const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/mongoose');
const cartRoutes = require('./routes/cart');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
