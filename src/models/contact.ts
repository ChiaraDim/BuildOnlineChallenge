import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/database';
import { z } from 'zod';

interface ContactAttributes {
    id: number;
    userEmail: string;
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    profileImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

interface ContactCreationAttributes extends Optional<ContactAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
  public id!: number;
  public userEmail!: string;
  public name!: string;
  public address!: string;
  public email!: string;
  public phoneNumber!: string;
  public profileImage?: string;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Contacts',
    tableName: 'contacts'
  }
);

export default Contact;
export { ContactCreationAttributes };

export const createContactSchema = z.object({
  userEmail: z.string().min(1, { message: 'User email is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  email: z.string().min(1, { message: 'Email is required' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
  profileImage: z.string().optional(),
});

export const updateContactSchema = createContactSchema.partial();
