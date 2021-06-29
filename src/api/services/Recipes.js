const RecipesModels =require('../models/Recipes');

const createRecipes=async(newRecipe)=>{
  const create = await RecipesModels.createRecipes(newRecipe);
  return create;
};

module.exports={
  createRecipes
};