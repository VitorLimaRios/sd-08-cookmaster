const usersModel = require('../models/users');
const pattern = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);
const BAD_REQUEST = 400;
const CONFLICT = 409;
const MIN_CHARACTERS = 5;
const MIN_QUANTITY = 0;
const MIN_ID_LENGTH = 16;
const MAX_ID_LENGTH = 24;

const userIsValid = async (name, email, password) => {
  if (!name || !email || !pattern.test(email) || !password) {
    return {
      err: BAD_REQUEST,
      message: 'Invalid entries. Try again.',
    };
  }

  const users = await usersModel.getAll();
  if (users.some((product) => product.email === email)) {
    return {
      err: CONFLICT,
      message: 'Email already registered',
    };
  }

  return { name, email, password };
};

// const idIsValid = async (id) => {
//   if (id.length === MIN_ID_LENGTH || id.length === MAX_ID_LENGTH) {
//     const product = await productsModel.findProduct(id);
//     if (product === null) {
//       return {
//         err: { code: 'invalid_data', message: 'Wrong id format' },
//       };
//     }
//     return product;
//   }

//   return {
//     err: { code: 'invalid_data', message: 'Wrong id format' },
//   };
// };

// const updateProductIsValid = (name, quantity) => {
//   if (name.length < MIN_CHARACTERS) {
//     return {
//       err: {
//         code: 'invalid_data',
//         message: '"name" length must be at least 5 characters long',
//       },
//     };
//   }

//   if (quantity <= MIN_QUANTITY) {
//     return {
//       err: {
//         code: 'invalid_data',
//         message: '"quantity" must be larger than or equal to 1',
//       },
//     };
//   }

//   if (typeof quantity !== 'number') {
//     return { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
//   }

//   return { name, quantity };
// };

module.exports = {
  userIsValid,
//   idIsValid,
//   updateProductIsValid,
};
