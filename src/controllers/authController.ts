import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/userRepository';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await UserRepository.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT secret is not defined');
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await UserRepository.findByEmail((req as any).user.email);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
    }
