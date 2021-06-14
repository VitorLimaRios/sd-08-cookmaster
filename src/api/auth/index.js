const jwt = require('jsonwebtoken');
const users = require('../../models/userModel');
const { unauthorized } = require('../../services/responseType');
const secret = 'olokobicho';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

function returnToken(email, password){
  const token = jwt.sign({email, password}, secret, jwtConfig);
  return token;
}

async function validateJWT(req, res, next){
  try {
    const token = req.headers['authorization'];
    if(!token) throw new Error('jwt malformed');
    const { email } = jwt.verify(token, secret);
    const user = await users.findUser(email);
    if(!user) throw new Error('Erro ao procurar usuario do token');
    req.user = user;
    next();
  } catch (error) {
    return res.status(unauthorized).json({message: error.message});
  }
}

module.exports = {
  returnToken, validateJWT
};

