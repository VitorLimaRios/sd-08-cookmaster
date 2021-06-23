
const recipesModel = require('../models/recipesModel');
// const userSchema = require('../schema/userSchema');
// const { errorGenerator } = require('../utils');

const createRecipe = async(objDataForCreate) =>{
  // const msgError =  userSchema.validateCreate(objDataForCreate);
  // if(msgError){
  //   return errorGenerator.badRequest(msgError);
  // }

  // const { email } = objDataForCreate;
  // const emailExistDB = await recipesModel.getByEmail(email);
  // if(emailExistDB){
  //   return errorGenerator.conflict('Email already registered');
  // }

  const result = await recipesModel.createRecipe(objDataForCreate);// você pode or o ID aqui

  return { recipes: result}; // depois trocar pelo objeto
};
 
module.exports = {
  createRecipe
};
