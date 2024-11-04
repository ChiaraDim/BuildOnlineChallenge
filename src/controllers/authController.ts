import jwt from 'jsonwebtoken';
import User from '../models/user';
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ where: { email } });

        if (!user || user.password !== password) {
            res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT secret is not defined');
        }

        const token = jwt.sign({ email: user!.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token: token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};