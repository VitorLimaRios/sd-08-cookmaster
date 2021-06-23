
const recipesModel = require('../models/recipesModel');
const recipeSchema = require('../schema/recipeSchema');
const { errorGenerator } = require('../utils');

const createRecipe = async(objDataForCreate) =>{
  const msgError =  recipeSchema.validateCreate(objDataForCreate);
  if(msgError)  return errorGenerator.badRequest(msgError);
  
  const {_id} = await recipesModel.createRecipe(objDataForCreate);

  return { recipe: {...objDataForCreate, _id}};
};

const getAll = () =>  recipesModel.getAll();

module.exports = {
  createRecipe,
  getAll
};
