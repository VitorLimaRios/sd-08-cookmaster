const rescue = require('express-rescue');
const UsersService = require('../services/Users');
const verifyUsers = require('../services/utils/UserSchema');
const {CREATED}=require('../services/utils/variableStatus');

const createUsers = rescue(async (req, res, next) => {
  const { error } = verifyUsers.validate(req.body);
  if(error){
    return next(error);}

  const { name, email, password } = req.body;
  const new_user = await UsersService.createUsers({ name, email, password });
  if (new_user.error) return next(new_user.error);
  res.status(CREATED).json(new_user);
});

const createAdmin=rescue(async(req,res,next)=>{
  const { name, email, password } = req.body;
  const new_admin = await UsersService.createAdmin({ name, email, password });
  res.status(CREATED).json(new_admin);
});

module.exports = {
  createUsers,
  createAdmin
};
