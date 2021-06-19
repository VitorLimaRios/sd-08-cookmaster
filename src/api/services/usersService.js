const usersModel = require('../models/usersModel');
const usersSchema = require ('../schema/usersSchema');

const ZERO_MODIFIED = 0;

const insertUser = async (name, email, password) => {
  const validations = await usersSchema.validate(name, email, password);
  const alreadyExists = await usersSchema.emailExists(email);

  if (validations) return validations;
  if (alreadyExists) return alreadyExists;

  const data = await usersModel.insertUser(name, email, password);

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
//   const validations = await usersModel.validate(name, quantity);
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
  insertUser,
};
