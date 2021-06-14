const rescue = require('express-rescue');
const service = require('../services/user');

const OK = 200;
const CREATED = 201;

const getAllUsers = rescue(async (_req, res) => {
  const users = await service.getAll();
  res.status(OK).json(users);
});

const createUsers = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;
  const createdUser = await service.add(name, email, password);
  createdUser.error && next(createdUser);
  res.status(CREATED).json(createdUser);
});

// const getById = rescue(async (req, res, next) => {
//   const { id } = req.params;

//   const productId = await service.getById(id);

//   productId.error && next(productId);

//   res.status(OK).json(productId);
// });

// const updateProduct = rescue(async (req, res, next) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;

//   const updatedProduct = await service.update(id, name, quantity);
//   updatedProduct.error && next(updatedProduct);
//   res.status(OK).json(updatedProduct);
// });

// const deleteProduct = rescue(async (req, res, next) => {
//   const { id } = req.params;

//   const deletedProduct = await service.deleteProduct(id);

//   deletedProduct.error && next(deletedProduct);

//   res.status(OK).json(deletedProduct);
// });

  
module.exports ={
  getAllUsers,
  createUsers,
  // getById,
  // updateProduct,
  // deleteProduct, 
};