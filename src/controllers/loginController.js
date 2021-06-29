const rescue = require('express-rescue');
const  loginService= require('../services/loginService');
const successResponse = require('../utils/successResponse');
const createToken = require('../auth/createToken');

const loginUser = rescue(async (req,res, next) =>{
  const { email, password } = req.body;

  const result = await loginService.loginUser({ email, password });
  if(result.error) return next(result);

  const token = createToken({ email, password });

  res.status(successResponse.OK()).json({ token });
});

module.exports = {
  loginUser
};