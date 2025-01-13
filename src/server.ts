import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import app from './app';
import sequelize from './config/database';
import { seedDatabase } from './config/seed'; 

sequelize.sync({ force: true })
    .then(async () => {
        
        await seedDatabase();

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });