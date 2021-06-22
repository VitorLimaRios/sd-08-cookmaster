const ListRecipe = require('../models/ListRecipes');
const sendImage = require('../models/SendImage');

const SendImage = async ({ id, user, image }) => {
  const recipeDetails = await ListRecipe(id);

  if (user.role === 'admin' || user._id === recipeDetails.userId) {
    const updated = await sendImage({
      id,
      image,
    });

    return { ...recipeDetails, image };
  }
};

module.exports = SendImage;