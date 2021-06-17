const { 
  add, 
  exclude, 
  getAll, 
  update, 
  getById, 
  getByEmail 
} = require('../models/user.model');
const jwt = require('../../jwt.config');

exports.createUser = async (entry) => {
  const user = await add({...entry, role: 'user'});
  delete user.password;
  return { user };
};

exports.loginUser = async ({ email, password }) => {
  const user = await getByEmail(email);
  if(!user || user.password !== password) 
    throw new Error('Incorrect username or password');
  const { _id, role } = user;
  const token = jwt.sign({user: { _id, email, role }});
  return { token };
};

exports.verifyById = async (id) => {
  const user = await getById(id);
  if(!user)  
    throw new Error('user not found');
  return !!user;
};

exports.verifyByEmail = async (email) => {
  const isValid = !! await getByEmail(email);
  if (isValid) throw new Error('Email already registered');
  return isValid;
};

exports.userAuthorization = ({_id, role}, userId) => {
  const isAdmin = role === 'admin';
  const isAuth = userId === _id;
  if(!isAuth && !isAdmin) throw new Error('');
  return true;
};

