import { Request, Response } from 'express';
import Contact from '../models/contact';

export const createContact  = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, address, email, phoneNumber, profileImage } = req.body;
        const userId = (req as any).user.id;

        const newContact = await Contact.create({
            name,
            address,
            email,
            phoneNumber,
            profileImage,
            userId,
        });

        res.status(201).json({ message: "Contact created successfully ", newContact });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create contact', error });
    }
};
