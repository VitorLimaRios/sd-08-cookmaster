const express = require('express');
const router = express.Router();
const middlewares_users = require('../middlewares/usersValidation');
const UsersServices = require('../services/usersSer');

const code = {
  code201: 201,
  code400: 400,
  code409: 409,
};

router.post('/', async (req, res) => {
  const {name, email, password} = req.body;
  console.log('req.body post line 11', name, email, password);

  const messageControlValidation = await middlewares_users
    .controlValidation(name, email, password);
  console.log('const isNameValid line 14', messageControlValidation);
  if(messageControlValidation.message) 
    return res.status(code.code400).json(messageControlValidation);
  
  const addUsers = await UsersServices.addUsers(req.body);
  console.log('addUsers usersCon line 23', addUsers);
  if(addUsers.message) 
    return res.status(code.code409).json(addUsers);

  return res.status(code.code201).json({user: addUsers});

});

module.exports = router;
