const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');
const { validateCreate } = require('../schema/recipesSchema');
const errorClient = require('../utils/errorClient');

const createRecipe = async(objDataForCreate, email) =>{
  const errorMessage = validateCreate(objDataForCreate);
  if(errorMessage)  return errorClient.badRequest(errorMessage);

  const {_id: userId } = await usersModel.getByEmail(email);
  
  const {_id} = await recipesModel.createRecipe({...objDataForCreate, userId});

  return { recipe: {...objDataForCreate, _id  }}; // testar o ops

};

const getAll = () =>  recipesModel.getAll();

const getById = async (id) => {
  const result = await recipesModel.getById(id);
  if(!result) return errorClient.notFound('recipe not found');

  return result;
};

const updateById = async (id, dataForUpdate) =>{
  await recipesModel.updateById(id, dataForUpdate); // lembrar da questão do erro
  const recipe = await recipesModel.getById(id);
  return recipe;
};

const remove = async (id) => await recipesModel.remove(id);

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateById,
  remove
};
