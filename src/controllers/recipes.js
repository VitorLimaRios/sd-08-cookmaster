const recipesService = require('../services/recipes');

const Created = 201;
const BadRequest = 400;

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const newRecipe = await recipesService
      .createRecipe(name, ingredients, preparation, userId);
      
    res.status(Created).json(newRecipe);
  } catch (err) {
    res.status(BadRequest).json({
      message: err.message,
    });
  }
};

module.exports = {
  createRecipe,
};
