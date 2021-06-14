const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { ObjectId } = require('mongodb');
const msg = require('../validators/ErrorMessages');

const modelSchema = new mongoose.Schema(
  {
    name: String,
    ingredients: String,
    preparation: String,
    userId: String,
  },
  { versionKey: false },
);

const modelName = 'Recipe';

let Recipe = null;

if (mongoose.connection && mongoose.connection.models[modelName]) {
  Recipe = mongoose.connection.models[modelName];
} else {
  Recipe = mongoose.model(modelName, modelSchema);
}
module.exports = {
  save: async (recipe) => {
    const newRecipe = new Recipe(recipe);
    return await newRecipe.save();
  },
  getRecipes: async () => {
    return await Recipe.find();
  },
  getOneRecipe: async (id) => {
    let recipe = null;
    if (ObjectId.isValid(id)) {
      recipe = await Recipe.findOne({ _id: id });
    }
    if (recipe) {
      return recipe;
    } else {
      return { code: msg.status.notFound, message: msg.recipeNotFound };
    }
  },
};
