const recipesModel = require('../models/recipesModel');
const recipesSchema = require ('../schema/recipesSchema');

const insertRecipe = async (name, ingredients, preparation, _id) => {
  const validations = await recipesSchema.validate(name, ingredients, preparation);

  if (validations) return validations;

  const data = await recipesModel.insertRecipe(name, ingredients, preparation, _id);

  return { status: 201, data };
};

// const findById = async (id) => {
//   const data = await recipesModel.findById(id);

//   if(!data) return null;

//   return { status: 200, data };
// };

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  if(!recipes) return null;

  return { status: 200, recipes };
};

// const updateByID = async (id, name, quantity) => {
//   const validations = await recipesModel.validate(name, quantity);
//   if (validations) return validations;

//   const data = await recipesModel.updateByID(id, name, quantity);
//   if(data.nModified === ZERO_MODIFIED) return null;

//   return { status: 200, message: { id, name, quantity } };
// };

// const deleteByID = async (id) => {
//   const data = await recipesModel.deleteByID(id);

//   if(data && data.deletedCount && data.deletedCount === 1) return { status: 200, data };

//   return null;
// };

module.exports = {
  insertRecipe,
  getAll,
};
