const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');
const { validateCreate } = require('../schema/recipesSchema');
const errorClient = require('../utils/errorClient');
const validateToken = require('../auth/validateToken');

const createRecipe = async(objDataForCreate, email) =>{
  const errorMessage = validateCreate(objDataForCreate);
  if(errorMessage)  return errorClient.badRequest(errorMessage);

  const {_id: userId } = await usersModel.getByEmail(email);
  
  const {_id} = await recipesModel.createRecipe({...objDataForCreate, userId});

  return { recipe: {...objDataForCreate, _id  }}; // testar o ops

};

const getAll = () =>  recipesModel.getAll();

module.exports = {
  createRecipe,
  getAll
};
