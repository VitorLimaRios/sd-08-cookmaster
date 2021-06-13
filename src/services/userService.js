const users = require('../models/userModel');
const { returnToken }  = require('../api/auth');

async function createUser(name, password, email){
  const data = await users.createUser(name, password, email);
  if (!data) throw new Error ('Email already registered');
  return data;
}

async function userLogin(email, password){
  const data = await users.checkLogin(email, password);
  if(!data) throw new Error('Incorrect username or password');
  return returnToken(email, password);
}

module.exports = {
  createUser, userLogin
};