import Contact from '../models/contact';
import { ContactCreationAttributes } from '../models/contact';

class ContactRepository {
  async getContactsByUserEmail(userEmail: string): Promise<Contact[]> {
    return await Contact.findAll({ where: { userEmail } });
  }

  async getContactByEmail(email: string): Promise<Contact | null> {
    return await Contact.findOne({ where: { email } });
  } 

  async createContact(contactData: ContactCreationAttributes): Promise<Contact> {
    return await Contact.create(contactData);
  }

  async updateContact(id: number, updatedData: Partial<Contact>): Promise<void> {
    await Contact.update(updatedData, { where: { id } });
  }
}

export default new ContactRepository();
