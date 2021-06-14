const usersModel = require('../models/users');
const usersService = require('../services/users');
const OK_STATUS = 200;
const CREATED_STATUS = 201;
const INVALID_DATA_STATUS = 422;

const getUsers = async (req, res) => {
  const users = await usersModel.getAll();
  return res.status(OK_STATUS).json({ users });
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const isValid = await usersService.userIsValid(name, email, password);
  if (isValid.err) {
    const { message } = isValid;
    return res.status(isValid.err).json({message});
  }
  const newUser = await usersModel.createUser(
    isValid.name,
    isValid.email,
    isValid.password
  );

  return res.status(CREATED_STATUS).json({user: {name, email, role: newUser.role, _id: newUser._id}});
};

// const findProduct = async (req, res) => {
//   const { id } = req.params;

//   const product = await productsService.idIsValid(id);
//   if (product.err) return res.status(INVALID_DATA_STATUS).json(product);

//   return res.status(OK_STATUS).json(product);
// };

// const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
//   const isValid = await productsService.updateProductIsValid(name, quantity);
//   if (isValid.err) return res.status(INVALID_DATA_STATUS).json(isValid);
//   const editedProduct = await productsModel.updateProduct(id, name, quantity);

//   return res.status(OK_STATUS).json(editedProduct);
// };

// const deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   const isValid = await productsService.idIsValid(id);
//   if (isValid.err) return res.status(INVALID_DATA_STATUS).json(isValid);
//   const deletedProduct = await productsModel.findProduct(id);
//   await productsModel.deleteProduct(id);

//   return res.status(OK_STATUS).json(deletedProduct);
// };

module.exports = {
  getUsers,
  createUser,
//   findProduct,
//   updateProduct,
//   deleteProduct,
};
