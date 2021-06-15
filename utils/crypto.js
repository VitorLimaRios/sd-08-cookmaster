const crypto = require('crypto');
const EIGHT = 8;
const secret = crypto.randomBytes(EIGHT).toString('hex');

module.exports = secret;