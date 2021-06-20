const usersModel = require('../models/userModel');

const createUser = async (dataUser) => {
  const getAll = await usersModel.getAll();
  const emailExist = getAll.some((data) => 
    data.email === dataUser.email
  );

  if(emailExist) return { message: 'Email already registered'};

  let objDataUser;
  if(dataUser.role) {
    objDataUser = dataUser;
  } else {
    objDataUser = {
      name: dataUser.name,
      email: dataUser.email,
      password: dataUser.password,
      role: 'user',
    };
  };

  const { name, email, password, role } = objDataUser;
  const insertUser = await UsersModel
    .addUser(name, email, password, role);

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