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
  const token = jwt.sign({user: { _id, role }});
  return { token };
};

exports.verifyByEmail = async (email) => {
  return !! await getByEmail(email);
};
