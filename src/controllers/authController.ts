import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { login as loginAction, getUser as getUserAction } from '../services/userService';

import UserRepository from '../repositories/userRepository';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const token = await loginAction(email, password);
    
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
      const email = (req as any).user.email;

      const user = await getUserAction(email);

      res.status(200).json({ user });
  } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
  }
};
