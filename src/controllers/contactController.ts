import { Request, Response } from 'express';
import Contact from '../models/contact';

export const addContact = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, address, email, cellphone, profilePicture } = req.body;
        const userId = (req as any).user.id;

        const newContact = await Contact.create({
            name,
            address,
            email,
            cellphone,
            profilePicture,
            userId,
        });

        return res.status(201).json(newContact);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create contact', error });
    }
};
