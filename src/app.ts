import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import contactsRoutes from './routes/contactRoutes';

const app = express();

app.use(express.json({ limit: '10mb' }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use('/api', authRoutes, contactsRoutes);

app.use((req, res, next) => {
    res.status(500).send({ message: 'Internal Server Error' });
});

export default app;