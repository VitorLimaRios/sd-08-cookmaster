const express = require('express');
const router = express.Router();
const userValidation = require('../middlewares/userValidation');
const UsersServices = require('../services/userServices');

const code = {
  CREATED: 201,
  BAD_REQUEST: 400,
  CONFLICT: 409,
};

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const validation = await userValidation
    .bodyValidation(name, email, password);

  if (validation.message) 
    return res.status(code.BAD_REQUEST).json(validation);
  
  const addUser = await UsersServices.createUser(req.body);
  
  if (addUser.message) 
    return res.status(code.CONFLICT).json(addUser);

  return res.status(code.CREATED).json({ user: addUser });

});

module.exports = router;
