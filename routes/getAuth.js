const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Set environment variables for encryption key and secret key
const encryptionKey = "rQCSUZSr7v85Jc4AHAFIMoiT1GSfmlWn";
const secretKey = "Yog2qVMvtrLEWVSTRp5ANAYvVw7b3Bh4";

// Function to generate auth keys
const generateAuthKeys = async (req, res) => {
    try {
        const authKey = crypto.randomBytes(32).toString('hex');
        const encryptedAuthKey = crypto.createHmac('sha256', encryptionKey).update(authKey).digest('hex');
        const payload = { authKey: encryptedAuthKey };
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