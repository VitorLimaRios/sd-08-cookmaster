const connection = require('./connection');
const {
  UNAUTHORIZED,
} = require('../service/consts');

// 2 - Crie um endpoint para o login de usuários

const getUser = async(email) => {
  const db = await connection();
  return userFound = await db.collection('users').findOne({'email': email });
  // if ( !userFound) {
  //   throw {
  //     status: UNAUTHORIZED,
  //     message: 'jwt malformed',
  //   };
  // }
  // return userFound;
};

const addRecipe = async(body, user) => {
  const objectWithUserId = {...body, userId: user._Id};
  const db = await connection();
  const recipeInsertion = await db.collection('recipes').insertOne(objectWithUserId);
  return recipeInsertion.ops[0];
};

module.exports = {
  getUser,
  addRecipe
};