import User from './models/user';
import Contact from './models/contact';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import app from './app';
import sequelize from './config/database';

sequelize.sync({ force: true })
    .then(async () => {
        
        const existingUser = await User.findOne({ where: { email: 'test@gmail.com' } });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash('password', 10);
            await User.create({
                email: 'test@gmail.com',
                password: hashedPassword,
            });
            console.log('Seed user created successfully!');
        } else {
            console.log('Seed user already exists.');
        }

        const existingContact = await Contact.findOne({ where: {  email: 'johnDoe@gmail.com' } });
        
        if (!existingContact) {
            await Contact.create({
                userEmail: 'test@gmail.com',
                name: 'John Doe',
                address: '123 Main St',
                email: 'johnDoe@gmail.com',
                phoneNumber: '123123123',
                profileImage: 'https://example.com/profile-image.jpg',
            });
            console.log('Seed contact created successfully!');
        } else {
            console.log('Seed contact already exists.');
        }

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });