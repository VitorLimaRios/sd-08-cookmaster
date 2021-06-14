const crypto = require('crypto');

const DEFAULT_NUMBER_OF_BYTES = 100;

const numberOfBytes = Number(process.argv[2]) || DEFAULT_NUMBER_OF_BYTES;

console.log(crypto.randomBytes(numberOfBytes).toString('base64'));
