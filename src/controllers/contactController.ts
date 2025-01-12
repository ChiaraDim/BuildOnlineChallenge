import { Request, Response } from 'express';
import ContactRepository from '../repositories/contactRepository';

export const createContact  = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, address, email, phoneNumber, profileImage } = req.body;
        const userEmail = (req as any).user.email;

        const newContact = await ContactRepository.createContact({
            userEmail,
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
        const userEmail = (req as any).user.email;
        const contacts = await ContactRepository.getContactsByUserEmail(userEmail);
        res.status(200).json({contacts: contacts});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'Failed to get contacts', error });
    }
};

export const getContact = async (req: Request, res: Response): Promise<void> => {
    try{
        const email = req.params.email;
        const contact = await ContactRepository.getContactByEmail(email);
        res.status(200).json({contact: contact});
    }
    catch(error){
        res.status(500).json({ message: 'Failed to get contact', error });
    }
}

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
