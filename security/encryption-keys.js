const crypto = require('crypto');

const encryptionKey = process.env.ENCRYPTION_KEY;

// Pad the key to the required length
const paddedKey = Buffer.alloc(32);
Buffer.from(encryptionKey, 'hex').copy(paddedKey);

const createAndEncryptKey = () => {
    const authKey = crypto.randomBytes(48).toString('base64'); // generate a random base64 string
    const iv = crypto.randomBytes(16); // generate a random IV
    const cipher = crypto.createCipheriv('aes-256-cbc', paddedKey, iv);
    let encryptedKey = cipher.update(authKey, 'utf8', 'hex');
    encryptedKey += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedKey }; // return the IV along with the encrypted key
};

const decryptKey = ({ iv, encryptedKey }) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', paddedKey, Buffer.from(iv, 'hex'));
    let decryptedKey = decipher.update(encryptedKey, 'hex', 'utf8');
    decryptedKey += decipher.final('utf8');
    return Buffer.from(decryptedKey, 'utf8').toString('base64'); // convert the decrypted key back to base64
};

module.exports = { createAndEncryptKey, decryptKey };