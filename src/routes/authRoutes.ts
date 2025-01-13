import express from 'express';
import { login, getUser } from '../controllers/authController';
import { zodValidator } from '../middleware/zodValidator';
import { createUserSchema } from '../models/user';

const router = express.Router();

router.post('/login', zodValidator({ bodySchema: createUserSchema }), login);
router.get('/user', getUser);

export default router;
