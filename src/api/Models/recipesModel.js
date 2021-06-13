const connection = require('./conn');
const { ObjectId } = require('mongodb');


const create = async (name, ingredients, preparation, userId) =>{
  const db = await connection();
  const newRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  // console.log(newRecipe.ops[0]);
  // return desestruturando <3
  return { recipe: {
    name,
    ingredients,
    preparation,
    userId,
    _id: newRecipe.insertedId,
  } };
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  // console.log(recipes);
  if (recipes) return recipes;
};

// const findRecipes = async (name) => {
//   const db = await connection();
//   const isFound = await db.collection('recipes').findOne({name});
//   // console.log('aoba', isFound);
//   return isFound;
// };

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipeId = await db.collection('recipes').findOne(ObjectId(id));
  // console.log(recipeId);
  return recipeId;
};


module.exports ={
  create,
  getAll,
  // findRecipes,
  getById,
};
