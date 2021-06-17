const connection = require('./connection');
const { ObjectId } = require('mongodb');

// 2 - Crie um endpoint para o login de usuários

const getUser = async(email) => {
  const db = await connection();
  return userFound = await db.collection('users').findOne({'email': email });
};

// 3 - Crie um endpoint para o cadastro de receitas
const addRecipe = async(body, user) => {
  const objectWithUserId = {...body, userId: user._Id};
  const db = await connection();
  const recipeInsertion = await db.collection('recipes').insertOne(objectWithUserId);
  return recipeInsertion.ops[0];
};

// 5 - Crie um endpoint para visualizar uma receita específica
const getRecipe = async (idParam) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(idParam));
  return recipe;
};

// 4 - Crie um endpoint para a listagem de receitas
const getAllRecipes = async () => {
  const db = await connection();
  const allRecipes = await db.collection('recipes').find().toArray();
  return allRecipes;
};


module.exports = {
  getAllRecipes,
  getUser,
  addRecipe,
  getRecipe
};