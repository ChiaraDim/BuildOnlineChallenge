require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
});

module.exports = app;