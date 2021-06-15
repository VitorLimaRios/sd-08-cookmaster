const express = require('express');
const router = express.Router();
const {
  validate,
  validateUserEmail,
  validateEmailFormat
} = require('../middlewares/userMiddleware');

const UserController = require('../controllers/UserController');

router.post('/',
  validate,
  validateUserEmail,
  validateEmailFormat,
  UserController.createUser
);

module.exports = router;
