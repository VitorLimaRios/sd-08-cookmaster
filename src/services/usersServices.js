const { ObjectID } = require('mongodb');
const { usersModel } = require('../models');
const {
  addUser,
  findEmail,
} = usersModel;

const createUser = async (name, email, password, role) => {
  const validation = await checkUserData(name, email, password, role);
  if (validation.message) return validation;

  const roleUser = !role ? 'user' : role;

  const newUser = await addUser(name, email, password, roleUser);

  return {
    user: {
      _id: newUser.insertedId,
      name,
      email,
      role: roleUser
    }
  };
};

const checkUserData = async (name, email, password, role) => {
  const invalidEntries = { message: 'Invalid entries. Try again.' };
  const emailValidate = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  
  if (!name || !email || !emailValidate.test(email) || !password) return invalidEntries;

  const searchEmail = await findEmail(email);

  if (searchEmail) return { message: 'Email already registered' };
  return false;
};

module.exports = {
  createUser,
};