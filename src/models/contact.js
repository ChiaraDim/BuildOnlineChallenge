const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Contact = sequelize.define('Contact', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Contact.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Contact, { foreignKey: 'userId' });

module.exports = Contact;