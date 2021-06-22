const CreateRecipe = require('../models/CreateRecipe');

const CREATED = 201;
const BAD_REQUEST = 400;

const CreateRecipeMiddleware = async (req, res) => {
  const { user } = req;
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  const newRecipe = await CreateRecipe({
    name, ingredients, preparation, userId: user._id
  });

  res.status(CREATED).json({
    recipe: newRecipe
  });
};

module.exports = CreateRecipeMiddleware;