const recipesModels= require('../models/recipes');

const STATUS_201 = 201;
const STATUS_400 = 400;


// CREATE
const create = async (req, res) => { 
  const { name, ingredients, preparation } = req.body;
  const userId = req.user._id;
  //console.log(userId);
  if (!name || !ingredients || !preparation) {
    return res.status(STATUS_400 ).json({ message: 'Invalid entries. Try again.' });
  }  
  const newRecipe = await recipesModels
    .create({ name, ingredients, preparation, userId });
  res.status(STATUS_201).json({ recipe: newRecipe });
};


module.exports = {
  create,
};
