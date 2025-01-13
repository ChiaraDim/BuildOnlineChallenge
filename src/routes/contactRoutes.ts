import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import * as contactController from '../controllers/contactController';
import { zodValidator } from '../middleware/zodValidator';
import { createContactSchema, updateContactSchema } from '../models/contact';

const router = express.Router();

router.post('/contacts', authMiddleware, zodValidator({ bodySchema: createContactSchema }), contactController.createContact);
router.get('/contacts', authMiddleware, contactController.getContacts);
router.get('/contacts/:email', authMiddleware, contactController.getContact);
router.put('/contacts/:id', authMiddleware, zodValidator({ bodySchema: updateContactSchema }), contactController.updateContact);

export default router;
