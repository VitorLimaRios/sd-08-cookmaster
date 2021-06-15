const recipesModels= require('../models/recipes');

const STATUS_201 = 201;
const STATUS_200 = 200;
const STATUS_400 = 400;


// CREATE
const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userId = req.user._id; 
  if (!name || !ingredients || !preparation) {
    return res.status(STATUS_400 ).json({ message: 'Invalid entries. Try again.' });
  }
  const newRecipe = await recipesModels
    .create({ name, ingredients, preparation, userId });
  res.status(STATUS_201).json({ recipe: newRecipe });
};

// GETALL
const getAll = async (_req, res) => {
  const recipes = await recipesModels.getAll();
  console.log(recipes);
  res.status(STATUS_200).send(recipes);
  
};


module.exports = {
  create,
  getAll,
};
