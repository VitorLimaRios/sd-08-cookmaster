const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const createRecipe = async (name, ingredients, preparation, userId) => {
  console.log(name, ingredients, preparation, userId);
  const recipe = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }))
    .then(result => result.ops[0]);
  return { recipe: { 
    _id: recipe._id,
    name,
    ingredients,
    preparation,
    userId,
  }};
};

const getAllRecipes = async () => {
  const allRecipes = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  return allRecipes;
};

const  getRecipeById = async (id) => {
  const recipe = await connection()
    .then((db) =>  db.collection('recipes').findOne(ObjectId(id)));
  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        {$set: { name, ingredients, preparation }}))
    .then(() => ({ name, ingredients, preparation }));
  // const recipeById = await findById(id);
  return recipe;
};

module.exports = { 
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};

