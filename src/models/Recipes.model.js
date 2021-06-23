const mongoose = require('../database/connection');

const RecipesSchema = new mongoose.Schema([{
  name: {
    type: String,
    require: true
  },
  ingredients: {
    type: String,
    require: true
  },
  preparation: {
    type: String,
    require: true
  },
  userId: {
    type: String,
    require: true
  },
  image: {
    type: String
  }
}]);

const Recipe = mongoose.model('Recipe', RecipesSchema);

module.exports = Recipe;