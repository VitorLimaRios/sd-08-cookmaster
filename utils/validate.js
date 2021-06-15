const model = require('../models/userModel');
const secret = require('../utils/crypto');

const jwt = require('jsonwebtoken');

const jwtConfig = { //cria dia ou horas para expirar o token.
  expiresIn: '7d',
  algorithm: 'HS256',
};

const encontrar = async (n) => {
   
  const { username } = n;
   
  const user = await model.getAll(username); //busca o username e password cadastrado.
  
  const token = jwt.sign({ data: user }, secret, jwtConfig); //assinatura completa do token.
  return decoded = jwt.verify(token, secret);
       
};
  
module.exports = encontrar;