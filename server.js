const app = require('./app');
const sequelize = require('./config/database');
const User = require('./models/user');
const Contact = require('./models/contact');

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