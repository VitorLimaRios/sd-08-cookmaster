const express = require('express');
const router = express.Router();

const middlewares_login = require('../middlewares/loginValidation');
const LoginServices = require('../services/loginSer');

const jwt = require('jsonwebtoken');
const secret = 'cookmaster';

const code = {
  code200: 200,
  code201: 201,
  code400: 400,
  code401: 401,
  code409: 409,
};

router.post('/', async (req, res) => {
  const {email, password} = req.body;
  console.log('req.body post login line 11', email, password);

  const messageControlValidation = await middlewares_login
    .controlValidation(email, password);
  console.log('const isNameValid line 14', messageControlValidation);
  if(messageControlValidation.message) 
    return res.status(code.code401).json(messageControlValidation);
  
  const getAll = await LoginServices.getAll(req.body);
  console.log('getAll loginCon line 23', getAll);
  if(getAll.message) 
    return res.status(code.code401).json(getAll);

  const payload = {
    _id: getAll._id,
    email: getAll.email,
    role: getAll.role,
  };


  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({data: payload}, secret, jwtConfig);

  return res.status(code.code200).json({token: token});

});

module.exports = router;
