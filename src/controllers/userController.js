const rescue = require('express-rescue');
const usersService = require('../services/usersService');
const createToken = require('../auth/createToken');

const STATUS_CREATE = 201;
const STATUS_OK = 200;

const createUser = rescue(async (req,res, next)=>{
  const { name, email, password } = req.body;

  const result = await usersService.createUser({ name, email, password });
  if(result.error) return next(result);

  res.status(STATUS_CREATE).json(result);

});

const loginUser = rescue(async (req,res, next) =>{

  const { email, password } = req.body;
  
  const objDataLogin = { email, password };

  const result = await usersService.loginUser(objDataLogin);
  if(result.error) return next(result);

  const token = createToken(objDataLogin);

  console.log(token);

  res.status(STATUS_OK).json({ token });
});

module.exports ={
  createUser,
  loginUser
};
