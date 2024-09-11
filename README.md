# Simple Payload Encryption and Decryption

A simple package that encrypts and decrypts payloads based on secret keys.

## Features

- Encrypts and decrypts payloads based on secret keys, a primary secret key and secondary IV key.
- Could be used on mobile apps and web apps to encrypt and decrypt api data.

## Installation

Install the package via npm:

```js
npm i crypt-payload
```

## Encrypt Data
Encrypt data using the primary secret key and secondary IV key.:

```js
const crypt = require('crypt-payload');
let data = { id: 1, name: 'Sample', age: 20 };
let encryptedData = crypt.encrypt('32_length_secretKey', '32_length_ivKey', JSON.stringify(data));
```

## Decrypt Data
Decrypt data using the primary secret key and secondary IV key.:

```js
const crypt = require('crypt-payload');
let data = crypt.decrypt('32_length_secretKey', '32_length_ivKey', encryptedData);
```