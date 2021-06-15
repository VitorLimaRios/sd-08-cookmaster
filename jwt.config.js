const {verify, sign, decode } = require('jsonwebtoken');

const SECRET = 'TRYBE_COCKMASTER';

exports.verify = (token) => verify(token, SECRET);
exports.decode = (token) => decode(token, SECRET);
exports.sign = (payload) => sign(payload, SECRET, {expiresIn: '86400'});