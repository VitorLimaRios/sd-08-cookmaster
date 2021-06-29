const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addNewRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();

  const recipeToAdd = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: recipeToAdd.insertedId,
    }
  };
};

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes')
    .find()
    .toArray();
    
  if (recipes) return recipes;
};

const getAllById = async (id) => {

  const db = await connection();
  const result = await db.collection('recipes')
    .findOne(ObjectId(id));

  return result;
};

const recipeToUpdate = async (id, name, ingredients, preparation) => {

  const db = await connection();
 
  const recipeToUpdate = await getAllById(id);
  await db.collection('recipes')
    .updateOne({_id: ObjectId(id)}, { $set: { name, ingredients, preparation } });

  return {
    _id: recipeToUpdate._id, name, ingredients, preparation, userId: recipeToUpdate.userId
  };
};
  
const recipeToDelete = async (id) => {

  const db = await connection();

  const result = await db.collection('recipes')
    .deleteOne({ _id: ObjectId(id) });

  return result;
};

module.exports = {
  addNewRecipe,
  getAllRecipes,
  getAllById,
  recipeToUpdate,
  recipeToDelete,
};