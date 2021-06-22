const Users = require('../models/Users');

const getAll = async () => Users.getAll();

const newUser = async (name, email, password) => {
  const userList = await Users.getAll();

  const isUnique = userList.find(result => result.user.email === email);
  if (isUnique) {
    return { err: { 
      'message': 'Email already registered',
    } };
  };

  const addUser = await Users.newUser(name, email, password);
  return addUser;
};

const findById = async (id) => Users.findById(id);

const login = async (email, password) => {
  const login = await Users.login(email, password);
  if (!login) return { err: {
    message: 'Incorrect username or password'
  } };
  return login;
};

module.exports = {
  getAll,
  newUser,
  findById,
  login,
};