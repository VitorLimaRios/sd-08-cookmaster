const rescue = require('express-rescue');
const usersService = require('../services/usersService');
const successResponse = require('../utils/successResponse');
const createToken = require('../auth/createToken');
const validateLogin = require('../schema/loginSchema');
const errorClient = require('../utils/errorClient');

const status = 200;

const loginUser = rescue(async (req, res, next) =>{
  const { error } = validateLogin.validate(req.body);

  if (error) throw errorClient.unauthorized('All fields must be filled');
  
  const { email, password } = req.body;

  const user = await usersService.getByEmail(email);

  if (!user || user.password !== password) {
    throw errorClient.unauthorized('Incorrect username or password'); 
  }

  const token = createToken({ email, password });

  res.status(successResponse.OK()).json({ token });
});

module.exports = {
  loginUser
};
