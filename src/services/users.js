const Users = require('../models/users');
const userSchema = require('../schema/users');

const addUser = async (userInfo) => {
  const { error } = userSchema.validate(userInfo);
  if (error) return {
    err: {
      message: 'Invalid entries. Try again',
      status: 400,
    }
  };

  const { email } = userInfo;
  const registeredEmail = await Users.findByEmail(email);
  if (registeredEmail) return {
    err: {
      message: 'Email already registered',
      status: 409,
    }
  };

  userInfo = { ...userInfo, role: 'user' };

  const newUser = await Users.addUser(userInfo);
  const { password, ...user } = newUser;
  return user;
};

module.exports = {
  addUser,
};
