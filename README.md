# Simple Data Encryption and Decryption

A simple npm package for encrypting and decrypting payloads using secret keys. This package is designed to securely handle data for both mobile and web applications by providing an easy-to-use API for encryption and decryption.

## Features

- Encryption and Decryption: Provides functions to encrypt and decrypt data using a primary secret key and a secondary Initialization Vector (IV) key.
- Versatile Use: Suitable for use in mobile apps, web apps, and any environment where secure data transmission is needed.

## Installation

Install the package via npm:

```js
npm install crypt-payload
```

## Encrypt Data
To encrypt data, use the encrypt function, providing a primary secret key, a secondary IV key, and the data to be encrypted:

```js
const crypt = require('crypt-payload');

const data = { id: 1, name: 'Sample', age: 20 };
const secretKey = 'yourPrimarySecretKey';
const ivKey = 'yourSecondaryIVKey';

// Encrypt data
const encryptedData = crypt.encrypt(secretKey, ivKey, JSON.stringify(data));

console.log('Encrypted Data:', encryptedData);
```

## Decrypt Data
To decrypt the encrypted data, use the decrypt function, providing the same primary secret key and IV key:

```js
const crypt = require('crypt-payload');

const secretKey = 'yourPrimarySecretKey';
const ivKey = 'yourSecondaryIVKey';

// Decrypt data
const decryptedData = crypt.decrypt(secretKey, ivKey, encryptedData);

console.log('Decrypted Data:', decryptedData);
```

## IMPORTANT NOTES

- The primary secret key and secondary IV key must be between 32 and 64 characters in length.
- The data to be encrypted or decrypted must be a string. Convert objects to strings using JSON.stringify() before encryption.

## License
MIT License

Feel free to add or modify any additional sections like "Contributing," "Changelog," or "Support" based on your package's requirements.