const Recipe = require('../models/Recipes.model');

module.exports = {
  index: async () => {
    const recipes = await Recipe.find();

    return recipes;
  },

  show: async (id) => {
    const recipe = await Recipe.findById(id);

    if (!recipe) return;

    return recipe;
  },

  create: async (request, name, ingredients, preparation) => {
    if (!name || !ingredients || !preparation) return;

    const recipe = await Recipe.create({
      name,
      ingredients,
      preparation,
      userId: request.user._id
    });

    return recipe;
  },

  update: async (id, name, ingredients, preparation) => {
    const recipe = await Recipe.findByIdAndUpdate(id, {
      name,
      ingredients,
      preparation
    }, { new: true });

    return recipe;
  },

  image: async (id, filename) => {
    const upload = await Recipe.findByIdAndUpdate(id, {
      image: `localhost:3000/src/uploads/${filename}`
    }, { new: true });

    return upload;
  },
  
  remove: async (id) => {
    const recipe = await Recipe.findByIdAndRemove(id);

    return recipe;
  }
};