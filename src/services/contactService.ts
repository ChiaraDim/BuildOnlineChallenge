import ContactRepository from '../repositories/contactRepository';
import userRepository from '../repositories/userRepository';

export const createContact = async (userEmail: string, name: string, address: string, email: string, phoneNumber: string, profileImage: string) => {
    try{
        const existingContact = await ContactRepository.getContactByEmail(email);
        if(existingContact){
            throw new Error('Contact already exists');
        }

        const newContact = await ContactRepository.createContact({
            userEmail,
            name,
            address,
            email,
            phoneNumber,
            profileImage,
        });
        return newContact;
    }
    catch(error){
        throw new Error('Failed to create contact');
    }
}

export const getContacts = async (userEmail: string) => {
    try{
        const existingContact = await userRepository.findByEmail(userEmail);
        if(!existingContact){
            throw new Error('Contact does not exist');
        }

        const contacts = await ContactRepository.getContactsByUserEmail(userEmail);
        return contacts;
    }
    catch(error){
        throw new Error('Failed to get contacts');
    }
}

export const getContact = async (email: string) => {
    try{

        const contact = await ContactRepository.getContactByEmail(email);
        if(!contact){
            throw new Error('Contact does not exist');
        }
        return contact;
    }
    catch(error){
        throw new Error('Failed to get contact');
    }
}

export const updateContact = async (id: number, name: string, address: string, email: string, phoneNumber: string, profileImage: string) => {
    try{

        const updatedData = { name, address, email, phoneNumber, profileImage };
        await ContactRepository.updateContact(id, updatedData);
    }
    catch(error){
        throw new Error('Failed to update contact');
    }
}