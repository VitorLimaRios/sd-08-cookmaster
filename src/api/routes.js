const express = require('express');

const userController = require('../controllers/userController');

const userRouter = express.Router();
userRouter.post('/', userController.createUser);

const loginRouter = express.Router();
loginRouter.post('/', userController.loginUser);

module.exports = {
  userRouter, 
  loginRouter
};
