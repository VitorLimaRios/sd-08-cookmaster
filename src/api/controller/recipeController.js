const service = require('../service/recipeService');
// const auth = require('../auth')


const CREATED = 201;
const NOT_VALID = 400;

const create = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const newRecipe = await service.createRecipe(name, ingredients, preparation, userId);
    
    res.status(CREATED).json(newRecipe);
  } catch (e) {
    return res.status(NOT_VALID).json({
      message: e.message,
    });
  }
};

module.exports = {
  create,
};
