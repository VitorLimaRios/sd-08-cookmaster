const express = require('express');
const router = express.Router();

const {
  validateFields,
  validateEmailFormat,
} = require('../middlewares/loginMiddleware');

const LoginController = require('../controllers/LoginController');

router.post('/',
  validateFields,
  validateEmailFormat,
  LoginController.login
);

module.exports = router;
