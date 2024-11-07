import express from 'express';
import { login, getUser } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.get('/user', getUser);

export default router;
