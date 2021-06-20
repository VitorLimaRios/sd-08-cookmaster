const express = require('express');
const router = express.Router();

const loginValidation = require('../middlewares/loginValidation');
const LoginServices = require('../services/loginServices');
const jwt = require('jsonwebtoken');
const secret = 'busquemcomercimento';

const code = {
  CREATED: 200,
  UNAUTHORIZED: 401,
};

router.post('/', async (req, res) => {
  const {email, password} = req.body;
  const validation = await loginValidation
    .bodyValidation(email, password);

  if(validation.message) 
    return res.status(code.UNAUTHORIZED).json(validation);

  const getAll = await LoginServices.getAll(req.body);
  if(getAll.message) 
    return res.status(code.UNAUTHORIZED).json(getAll);

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

  return res.status(code.CREATED).json({token: token});
});

module.exports = router;
