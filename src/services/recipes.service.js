const recipeModel = require('../models/recipes.modules');

const uploadImage = async (id, image) => {
  const result = await recipeModel.uploadImage(id, image);
  if (!result) {
    return { code: 404, message: 'recipe not found' };
  }
  return { code: 200, result };
};

module.exports = {
  uploadImage,
};
