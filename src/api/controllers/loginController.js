const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const {status, message} = require('../services/statusAndMessages');
const env = require('../env');
// const loginService = require('../services/loginService');
// const {} = loginService;

router.post('/', async(req, res) => {
  try {
    const {email:bodyemail, password: bodyPassword} = req.body;

    if(!bodyemail || !bodyPassword) {
      res.status(status.UNAUTHENTICATED).json(message.loginEmpty);
    }
    const userFind = await userModel.findEmail(bodyemail);
    // console.log(userFind);
    if(!userFind) {
      res.status(status.UNAUTHENTICATED).json(message.loginIncorrect);
    }
    const passwordCheck = (bodyPassword === userFind.password);
    if(!passwordCheck) {
      res.status(status.UNAUTHENTICATED).json(message.loginIncorrect);
    }

    const jwtConfig= {
      expiresIn: '1h',
      algorithm:'HS256'
    };

    const {_id, email, role} = userFind;
    const token = jwt.sign(
      {id: _id, email: email, role: role}, env.secret, jwtConfig);
    
    res.status(status.OK).json({'token': token});
    
  } catch (error) {
    console.error(error.message);
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

module.exports = router;