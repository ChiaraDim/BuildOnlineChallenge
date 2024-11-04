const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};