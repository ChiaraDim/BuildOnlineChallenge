import Contact from '../models/contact';
import { ContactCreationAttributes } from '../models/contact';

class ContactRepository {
  async getContactsByUserId(userId: number): Promise<Contact[]> {
    return await Contact.findAll({ where: { userId } });
  }

  async createContact(contactData: ContactCreationAttributes): Promise<Contact> {
    return await Contact.create(contactData);
  }

  async updateContact(id: number, updatedData: Partial<Contact>): Promise<void> {
    await Contact.update(updatedData, { where: { id } });
  }
}

export default new ContactRepository();
