const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createAndEncryptKey } = require('../security/encryption-keys');

const secretKey = process.env.SECRET_KEY;

// Function to generate auth keys
const generateAuthKeys = async (req, res) => {
    try {
        const authKey = createAndEncryptKey();
        const payload = { authKey };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate auth keys' });
    }
};

// Route to handle request for auth keys
router.get('/', generateAuthKeys);

module.exports = router;