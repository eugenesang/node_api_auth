const jwt = require('jsonwebtoken');
const { decryptKey } = require('../security/encryption-keys');

const authMiddleware = (req, res, next) => {
    const token = req.headers.auth || req.query.auth;

    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const decrypted = decryptKey(decoded.authKey);
        req.user = {
            ...decoded,
            text: decrypted
        };
        
        next();
    } catch (err) {
        return res.status(401).send({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;