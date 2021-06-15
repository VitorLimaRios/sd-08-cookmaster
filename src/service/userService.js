const userModel = require('../model/userModel');
const useValidate = require('./userValidations');

const addNewUser = async (data) => {
  const { name, email, password } = data;
  const validations = await useValidate
    .userValidations(name, email, password);

  if (validations) return validations;

  await userModel.addUser(data);

  const getUser = await userModel.getOneUser(email);
  const message = {
    _id: getUser._id,
    name: getUser.name,
    email: getUser.email,
    role: getUser.role,
  };

  return { message, code: 201 };
};

module.exports = {
  addNewUser,
};
