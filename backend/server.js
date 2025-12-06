// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// routes
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// mount routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);


// health
app.get('/', (req, res) => res.json({ ok: true, msg: 'Canteen backend running' }));

// connect to mongo and start server
const PORT = process.env.PORT || 5000;
console.log("MONGO_URI:", process.env.MONGO_URI ? "found" : "undefined");
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => {
    console.error("Mongo connection error:", err.message);
    process.exit(1);
  });
