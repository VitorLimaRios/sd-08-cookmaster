const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  connection()
    .then(async (db) => {
      const newRecipe = await db.collection('recipes')
        .insertOne({
          name,
          ingredients,
          preparation,
          userId
        });
      return {
        recipe: {
          name,
          ingredients,
          preparation,
          userId,
          _id: newRecipe.insertedId,
        }
      };
    });
};

const getAllRecipes = async () => {
  connection()
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

const updateRecipe = async (id, name, ingredients, preparation) =>
  connection()
    .then(async (db) => {
      const recipeToUpdate = await db
        .collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

      return {
        _id: recipeToUpdate._id,
        name,
        ingredients,
        preparation,
        userId: recipeToUpdate.userId
      };
    });

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
