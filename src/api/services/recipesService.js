const recipesModel = require('../models/recipesModel');
const recipesSchema = require ('../schema/recipesSchema');

const insertRecipe = async (name, ingredients, preparation, _id) => {
  const validations = await recipesSchema.validate(name, ingredients, preparation);

  if (validations) return validations;

  const data = await recipesModel.insertRecipe(name, ingredients, preparation, _id);

  return { status: 201, data };
};

// const findById = async (id) => {
//   const data = await productsModel.findById(id);

//   if(!data) return null;

//   return { status: 200, data };
// };

// const getAll = async () => {
//   const products = await productsModel.getAll();
//   if(!products) return null;

//   return { status: 200, products };
// };

// const updateByID = async (id, name, quantity) => {
//   const validations = await recipesModel.validate(name, quantity);
//   if (validations) return validations;

//   const data = await productsModel.updateByID(id, name, quantity);
//   if(data.nModified === ZERO_MODIFIED) return null;

//   return { status: 200, message: { id, name, quantity } };
// };

// const deleteByID = async (id) => {
//   const data = await productsModel.deleteByID(id);

//   if(data && data.deletedCount && data.deletedCount === 1) return { status: 200, data };

//   return null;
// };

module.exports = {
  insertRecipe,
};
