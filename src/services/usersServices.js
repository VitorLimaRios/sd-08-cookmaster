const usersModel = require('../models/usersModel');
const { isValid } = require('../schemas/usersSchemas');

const createUser = async (name, email, password) => {
  if (!isValid(name, email, password)) throw new Error('Invalid entries. Try again.');
  const allUsers = await usersModel.getAllUsers();
  const userExist = allUsers.some((element) => element.email === email);
  if (userExist) throw new Error('Email already registered');
  const user = await usersModel.createUser(name, email, password);
  return user;
};

const getAllUsers = async () => {
  const users = await usersModel.getAllUsers();
  return users;
};

const createAdmin = async (name, email, password, role) => {
  if (!role !== 'admin') throw new Error('Only admins can register new admins');
  const newAdmin = await usersModel.createAdmin(name, email, password);
  return newAdmin;
};

module.exports = {
  createUser,
  getAllUsers,
  createAdmin,
};