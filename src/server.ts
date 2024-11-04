import app from './app';
import dotenv from 'dotenv';
import sequelize from './config/database';

dotenv.config();

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synchronized.');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });