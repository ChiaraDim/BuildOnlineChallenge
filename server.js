const app = require('./app');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database');

dotenv.config();

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synchronized.');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });