const joi = require('joi');
const model = require('../models/user');

const schema = joi.object({
  name: joi
    .string()
    .required(),
  email: joi
    .string()
    .email()    
    .required(),
  password: joi
    .string()
    .required()
})
  .messages({
    'any.required': 'Invalid entries. Try again.'
  });

const getAll = async () => model.getAll();

const add = async (name, email, password) => {
  const { error } = schema.validate({ name, email, password });
  if (error) {
    return {
      error,
      status: 400
    };
  }

  const emailAlreadyInserted = await model.getByEmail(email);
  
  if (emailAlreadyInserted) {
    return {
      error: { message: 'Email already registered'},
      status: 409
    };
  }

  return model.add(name, email, password);
};

// const getById = async (id) => {
//   const productID = await model.getById(id);

//   if (!productID) {
//     return {
//       code: 'invalid_data',
//       error: { message: 'Wrong id format' },
//       status: 422
//     };
//   }

//   return productID;
// };

// const update = async (id, name, quantity) => {
//   const { error } = schema.validate({ name, quantity });

//   if (error) { 
//     return {
//       code: 'invalid_data',
//       error,
//       status: 422
//     };
//   };

//   const productId = await model.update(id, name, quantity);

//   return productId;
// };

// const deleteProduct = async (id) => {
//   const product = await model.getById(id);
  
//   if (!product){
//     return {
//       code: 'invalid_data',
//       error: { message: 'Wrong id format' },
//       status: 422
//     };
//   }

//   const deletedProduct = await model.deleteProduct(id);
  
//   return deletedProduct;
// };


module.exports = {
  getAll,
  add,
  // getById,
  // update,
  // deleteProduct,
}; 
  