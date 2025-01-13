import { Request, Response } from 'express';
import { createContact as createContactAction, getContacts as getContactsAction, getContact as getContactAction, updateContact as updateContactAction} from '../services/contactService';

export const createContact  = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, address, email, phoneNumber, profileImage } = req.body;
        const userEmail = (req as any).user.email;
        
        const newContact = await createContactAction(userEmail, name, address, email, phoneNumber, profileImage);

        res.status(201).json({ message: "Contact created successfully ", newContact });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create contact', error });
    }
};

export const getContacts = async (req: Request, res: Response): Promise<void> => {
    try{
        const userEmail = (req as any).user.email;

        const contacts = await getContactsAction(userEmail);

        res.status(200).json({contacts: contacts});
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Failed to get contacts', error });
    }
};

export const getContact = async (req: Request, res: Response): Promise<void> => {
    try{
        const email = req.params.email;
        
        const contact = await getContactAction(email);
        
        res.status(200).json({contact: contact});
    } catch(error){
        res.status(500).json({ message: 'Failed to get contact', error });
    }
}

export const updateContact = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = Number(req.params.id);
        const { name, address, email, phoneNumber, profileImage } = req.body;
        
        await updateContactAction(id, name, address, email, phoneNumber, profileImage);
        
        res.status(200).json({ message: 'Contact updated successfully' });
    }
    catch(error){
        res.status(500).json({ message: 'Failed to update contact', error });
    }
};
