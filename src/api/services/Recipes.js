const RecipesModels =require('../models/Recipes');

const createRecipes=async(newRecipe)=>{
  const create = await RecipesModels.createRecipes(newRecipe);
  return create;
};


const findAll = async () =>{ 
  const allRecipe = await RecipesModels.findAll();
  return allRecipe;};
module.exports={
  createRecipes,
  findAll
};