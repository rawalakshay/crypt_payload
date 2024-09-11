const crypto = require("crypto");
const algorithm = "aes-256-cbc";

module.exports = {

    encrypt: (secretKey, ivKey, data) => {
        if (secretKey.length < 32) {
            throw new Error("secretKey must be atleast 32 characters long");
        }
        if (ivKey.length < 32) {
            throw new Error("ivKey must be atleast 32 characters long");
        }
        if (typeof data !== 'string') {
            throw new Error("data must be a string");
        }
        ivKey = getSHA(ivKey);
        ivKey = ivKey.substring(0, 16);
        let shaKey = getSHA(secretKey);
        shaKey = shaKey.substring(0, 32);
        return encryptData(shaKey, ivKey, data);
    },

    decrypt: (secretKey, ivKey, encryptedData) => {
        if (secretKey.length < 32) {
            throw new Error("secretKey must be atleast 32 characters long");
        }
        if (ivKey.length < 32) {
            throw new Error("ivKey must be atleast 32 characters long");
        }
        if (typeof encryptedData !== 'string') {
            throw new Error("data must be a string");
        }
        ivKey = getSHA(ivKey);
        ivKey = ivKey.substring(0, 16);
        let shaKey = getSHA(secretKey);
        shaKey = shaKey.substring(0, 32);
        return decryptData(shaKey, ivKey, encryptedData);
    },
}

function encryptData(key, iv, data) {
    try {
        let adjustedKey = key;
        if (adjustedKey.length < 16) {
            const numPad = 16 - adjustedKey.length;
            adjustedKey += '0'.repeat(numPad);
        } else if (adjustedKey.length > 32) {
            adjustedKey = adjustedKey.substring(0, 32);
        }

        const ivBuffer = Buffer.from(iv);
        const keyBuffer = Buffer.from(adjustedKey, 'utf8');
        const dataBuffer = Buffer.from(data, 'utf8');

        const cipher = crypto.createCipheriv(algorithm, keyBuffer, ivBuffer);

        let encryptedData = cipher.update(dataBuffer, 'utf8', 'base64');
        encryptedData += cipher.final('base64');
        return encryptedData;
    } catch (err) {
        console.error("encryptData fn :: ", err);
        throw err;
    }
}

function decryptData(key, iv, encryptedData) {
    try {
        let adjustedKey = key;
        if (adjustedKey.length < 16) {
            const numPad = 16 - adjustedKey.length;
            adjustedKey += '0'.repeat(numPad);
        } else if (adjustedKey.length > 32) {
            adjustedKey = adjustedKey.substring(0, 32);
        }

        const ivBuffer = Buffer.from(iv);
        const keyBuffer = Buffer.from(adjustedKey, 'utf8');

        const decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);

        let decryptedData = decipher.update(encryptedData, 'base64', 'utf8');
        decryptedData += decipher.final('utf8');
        return decryptedData;
    } catch (err) {
        console.error("decryptData fn :: ", err);
        throw err;
    }
}

function getSHA(input) {
    return crypto.createHash('sha256').update(input, 'utf8').digest('hex');
}