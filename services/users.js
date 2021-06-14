const usersModel = require('../models/users');

const createUser = async (name, email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !password || !emailRegex.test(email)) {
    return { code: 400, message: { message: 'Invalid entries. Try again.' } };
  }

  const isUnique = await usersModel.findEmail(email);
  if (isUnique) {
    return { code: 409, message: { message: 'Email already registered' } };
  }

  const data = await usersModel.createUser(name, email, password);
  if (data.error) {
    return { code: 500, message: { message: data.error } };
  }

  const user = {
    name: data.name,
    email: data.email,
    role: data.role,
    _id: data._id
  };

  return { code: 201, message: { user } };
};

module.exports = {
  createUser,
};
