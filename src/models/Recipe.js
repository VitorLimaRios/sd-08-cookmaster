const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  return connection()
    .then((db) => db.collection('recipes')
      .insertOne({
        name,
        ingredients,
        preparation,
        userId
      }))
    .then(({ insertedId }) => ({
      recipe: {
        name,
        ingredients,
        preparation,
        userId,
        _id: insertedId,
      }
    }));
};

const getAllRecipes = async () => {
  const recipes = connection()
    .then((db) => db
      .collection('recipes')
      .find()
      .toArray());
  if (recipes) return recipes;
};


const getRecipeById = async (id) => {
  return connection()
    .then((db) => db
      .collection('recipes')
      .findOne(ObjectId(id)));
};

const updateRecipe = async (id, { name, ingredients, preparation, userId }) =>
  connection()
    .then((db) => db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, {
        $set: { name, ingredients, preparation, userId }
      }))
    .then(() => ({
      _id: id,
      name,
      ingredients,
      preparation,
      userId
    }));

const deleteRecipe = async (id) => {
  return connection()
    .then(async (db) => db
      .collection('recipes')
      .deleteOne({ _id: ObjectId(id) })
    );
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};
