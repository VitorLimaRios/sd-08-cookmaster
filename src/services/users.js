const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const userSchema = require('../schema/users');

const secret = 'secretdetoken';

const addUser = async (userInfo) => {
  const { error } = userSchema.validate(userInfo);
  console.log(error);
  if (error) return {
    err: {
      message: 'Invalid entries. Try again.',
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

const addAdmin = async (newAdminInfo, userAdmin) => {
  const { error } = userSchema.validate(newAdminInfo);
  console.log(error);
  if (error) return {
    err: {
      message: 'Invalid entries. Try again.',
      status: 400,
    }
  };

  if (userAdmin.role !== 'admin') {
    return {
      err: {
        message: 'Only admins can register new admins',
        status: 403,
      }
    };
  }

  newAdminInfo = { ...newAdminInfo, role: 'admin' };
  const newAdmin = await Users.addUser(newAdminInfo);
  const { password, ...adminInfo } = newAdmin;
  return adminInfo;
};

const login = async (userInfo) => {
  const { email, password } = userInfo;

  if (!email || !password) {
    return {
      err: {
        message: 'All fields must be filled',
        status: 401,
      }
    };
  }

  const userByEmail = await Users.findByEmail(email);

  if (!userByEmail || password !== userByEmail.password) {
    return {
      err: {
        message: 'Incorrect username or password',
        status: 401,
      }
    };
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const { password: passcode, ...user } = userByEmail;

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return token;
};

module.exports = {
  addUser,
  addAdmin,
  login,
};
