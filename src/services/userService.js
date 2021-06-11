const users = require('../models/userModel');

async function createUser(name, password, email){
  const data = await users.createUser(name, password, email);
  if (!data) throw new Error ('Email already registered');
  return data;
}

module.exports = {
  createUser
};