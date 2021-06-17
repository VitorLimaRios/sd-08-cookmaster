const connection = require('./connection');
const {
  CONFLICT,
} = require('../service/consts');

// 1 - Crie um endpoint para o cadastro de usuários

const verifyConflictEmails = async(email) => {
  const db = await connection();
  const userFound = await db.collection('users').findOne({'email': email });
  if (userFound) {
    throw {
      status: CONFLICT,
      message: 'Email already registered'
    };
  }
};

const addUser = async(body) => {
  const {password, ...bodyWithoutPass} = body;
  const objectWithRole = {...bodyWithoutPass, role: 'user'};
  const db = await connection();
  const userInsertion = await db.collection('users').insertOne(objectWithRole);
  return userInsertion.ops[0];
};

module.exports = {
  verifyConflictEmails,
  addUser
};