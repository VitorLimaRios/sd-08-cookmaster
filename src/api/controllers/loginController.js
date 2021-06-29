const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');
// const loginService = require('../services/loginService');
// const {} = loginService;

const STATUS_OK = 200;
const ERROR_LOGIN = 401; 
const ERROR_SERVER = 500;
const messageErrorServer = {message: 'Sistema Indisponível'};
const messageLoginEmpty = {message: 'All fields must be filled'};
const messageLoginIncorrect = {message: 'Incorrect username or password'};

const secret = 'RaulSeixas';

router.post('/', async(req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password) {
      res.status(ERROR_LOGIN).send(messageLoginEmpty);
    }
    const userFind = await loginModel.findEmail(email);
    const passwordCheck = (password === userFind.password);
    if(!userFind || !passwordCheck) {
      res.status(ERROR_LOGIN).send(messageLoginIncorrect);
    }

    const jwtConfig= {
      expiresIn: 300,
      algorithm:'HS256'
    };

    const token = jwt.sign(
      {data: [userFind.id, userFind.email, userFind.role]}, secret, jwtConfig);
    
    res.status(STATUS_OK).json({'token': token});
    
  } catch (error) {
    console.error(error.message);
    res.status(ERROR_SERVER).send(messageErrorServer);
  }
});

module.exports = router;