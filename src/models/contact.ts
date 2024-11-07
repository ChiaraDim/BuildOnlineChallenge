import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/database';

interface ContactAttributes {
    id: number;
    userId: number;
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
  public userId!: number;
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
    userId: {
      type: DataTypes.INTEGER,
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
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.TEXT,
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