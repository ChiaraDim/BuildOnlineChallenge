import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import * as contactController from '../controllers/contactController';

const router = express.Router();

router.post('/contacts', authMiddleware, contactController.createContact);
router.get('/contacts', authMiddleware, contactController.getContacts);
router.get('/contacts/:id', authMiddleware, contactController.getContactById);

export default router;
