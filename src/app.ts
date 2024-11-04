import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', authRoutes);

app.use((req, res, next) => {
    res.status(500).send({ message: 'Internal Server Error' });
});

export default app;