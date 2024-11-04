const jwt = requiere('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header['authorization'];

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Forbidden' });
        }

        req.user = decoded;
        next();
    });
};