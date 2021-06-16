const express = require('express');
const router = express.Router();

const {
  validateFields,
  validateEmailFormat,
  validatePassword
} = require('../middlewares/loginMiddleware');

const LoginController = require('../controllers/LoginController');

router.post('/',
  validateFields,
  validateEmailFormat,
  validatePassword,
  LoginController.login
);

module.exports = router;
