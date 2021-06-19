const express = require('express');
const router = express.Router();

const {
  validateFields,
  validateEntriesFormat,
} = require('../middlewares/loginMiddleware');

const LoginController = require('../controllers/LoginController');

router.post('/',
  validateFields,
  validateEntriesFormat,
  LoginController.login
);

module.exports = router;
