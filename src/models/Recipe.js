const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  preparation: String,
  userId: String,
},{ versionKey: false });

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
};
