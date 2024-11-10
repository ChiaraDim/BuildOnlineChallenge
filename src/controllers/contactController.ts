import { Request, Response } from 'express';
import ContactRepository from '../repositories/contactRepository';

export const createContact  = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, address, email, phoneNumber, profileImage } = req.body;
        const userId = (req as any).user.id;

        const newContact = await ContactRepository.createContact({
            userId,
            name,
            address,
            email,
            phoneNumber,
            profileImage,
          });

        res.status(201).json({ message: "Contact created successfully ", newContact });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create contact', error });
    }
};

export const getContacts = async (req: Request, res: Response): Promise<void> => {
    try{
        const userId = (req as any).user.id;
        const contacts = await ContactRepository.getContactsByUserId(userId);
        res.status(200).json({contacts: contacts});
    }
    catch(error){
        res.status(500).json({ message: 'Failed to get contacts', error });
    }
};

export const updateContact = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = Number(req.params.id);
        const { name, address, email, phoneNumber, profileImage } = req.body;
        const updatedData = { name, address, email, phoneNumber, profileImage };
        await ContactRepository.updateContact(id, updatedData);
        res.status(200).json({ message: 'Contact updated successfully' });
    }
    catch(error){
        res.status(500).json({ message: 'Failed to update contact', error });
    }
};
