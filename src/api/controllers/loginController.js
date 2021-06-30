const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');
const {status, message} = require('../services/statusAndMessages');
// const loginService = require('../services/loginService');
// const {} = loginService;

// const STATUS_OK = 200;
// const ERROR_LOGIN = 401; 
// const ERROR_SERVER = 500;
// const messageErrorServer = {message: 'Sistema Indisponível'};
// const messageLoginEmpty = {message: 'All fields must be filled'};
// const messageLoginIncorrect = {message: 'Incorrect username or password'};

router.post('/', async(req, res) => {
  try {
    const {email:bodyemail, password: bodyPassword} = req.body;

    if(!bodyemail || !bodyPassword) {
      res.status(status.UNAUTHENTICATED).json(message.loginEmpty);
    }
    const userFind = await loginModel.findEmail(bodyemail);
    // console.log(userFind);
    if(!userFind) {
      res.status(status.UNAUTHENTICATED).json(message.loginIncorrect);
    }
    const passwordCheck = (bodyPassword === userFind.password);
    if(!passwordCheck) {
      res.status(status.UNAUTHENTICATED).json(message.loginIncorrect);
    }

    const secret = 'RaulSeixas';    
    const jwtConfig= {
      expiresIn: '1h',
      algorithm:'HS256'
    };

    const {_id, email, role} = userFind;
    const token = jwt.sign(
      {id: _id, email: email, role: role}, secret, jwtConfig);
    
    res.status(status.OK).json({'token': token});
    
  } catch (error) {
    console.error(error.message);
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

module.exports = router;