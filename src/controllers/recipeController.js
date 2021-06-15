const { CREATED } = require('../api/constants/statusCodes');
const { newRecipe } = require('../services/recipeServices');

const createsRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  console.log(userId);

  const createdRecipe = await newRecipe(name, ingredients, preparation, userId);

  if (createdRecipe.errorMessage) {
    const {errorMessage, errorCode} = createdRecipe;
    return res.status(errorCode).json({message: errorMessage});
  }
  return res.status(CREATED).json({recipe: {...createdRecipe}});

};


module.exports = {
  createsRecipe,
};
