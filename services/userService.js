const model = require('../models/userModel');
const validator = require('email-validator');

const getAll = async () => model.getAll();

const create = async (users) => {
  const { name, email, password } = users;
  const getEmail = await getAll();
  const emailExists = getEmail.some(element => element.email === email);
  const validation = validator.validate(email);
  if (!name || !email || !validation || !password) {
    return {      
      message: 'Invalid entries. Try again.'      
    };
  } 
  if (emailExists) {
    return {      
      message: 'Email already registered'       
    };
  }   
  return model.create(users);
};



module.exports = {
  getAll,
  create,
};