import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ContactAttributes {
    id?: number;
    name: string;
    address: string;
    email: string;
    cellphone: string;
    profilePicture?: string;
    userId: number;
}

interface ContactCreationAttributes extends Optional<ContactAttributes, 'id' | 'profilePicture'> {}

class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
    public id!: number;
    public name!: string;
    public address!: string;
    public email!: string;
    public cellphone!: string;
    public profilePicture?: string;
    public userId!: number;
}

Contact.init(
    {
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
            validate: {
                isEmail: true,
            },
        },
        cellphone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Contact',
    }
);

export default Contact;
