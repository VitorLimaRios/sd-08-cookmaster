const connection = require('./connection');
const {
  UNAUTHORIZED,
} = require('../service/consts');

// 2 - Crie um endpoint para o login de usuários

const getUser = async(email) => {
  const db = await connection();
  const userFound = await db.collection('users').findOne({'email': email });
  if (userFound) {
    return userFound;
  } else {
    throw {
      status: UNAUTHORIZED,
      message: 'Incorrect username or password',
    };
  }
};

module.exports = {
  getUser
};