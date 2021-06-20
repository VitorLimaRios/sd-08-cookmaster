const UsersModel = require('../models/userModel');

const createUser = async (dataUsers) => {

  const getAll = await UsersModel.getAll();
  const emailExist = getAll.some((data) => 
    data.email === dataUsers.email
  );

  if(emailExist) return { message: 'Email already registered'};

  let objDataUsers;
  if(dataUsers.role) {
    objDataUsers = dataUsers;
  } else {
    objDataUsers = {
      name: dataUsers.name,
      email: dataUsers.email,
      password: dataUsers.password,
      role: 'user',
    };
  };

  const { name, email, password, role } = objDataUsers;
  const insertUser = await UsersModel
    .addUsers(name, email, password, role);

  return {
    name,
    email,
    role,
    _id: insertUser._id,
  };
};

module.exports = {
  createUser,
};