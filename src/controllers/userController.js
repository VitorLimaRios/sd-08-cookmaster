const rescue = require('express-rescue');
const usersService = require('../services/usersService');

const STATUS_CREATE = 201;

const createUser = rescue(async (req,res, next)=>{
  const { name, email, password } = req.body;

  const result = await usersService.createUser({ name, email, password });
  if(result.error) return next(result);

  res.status(STATUS_CREATE).json(result);

});

const loginUser = rescue(async (req,res, next) =>{
  console.log('eu fui chamada');
  res.status(STATUS_CREATE).json({ user: 'Deu bom'});
});

module.exports ={
  createUser,
  loginUser
};
