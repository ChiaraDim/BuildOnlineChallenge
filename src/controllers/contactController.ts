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
        res.json({contacts: contacts});
    }
    catch(error){
        res.status(500).json({ message: 'Failed to get contacts', error });
    }
};

export const getContactById = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = Number(req.params.id);
        const contact = await ContactRepository.getContactById(id);
        if(!contact){
            res.status(404).json({ message: 'Contact not found' });
            return;
        }
        res.json({contact: contact});
    }
    catch(error){
        res.status(500).json({ message: 'Failed to get contact', error });
    }
};
