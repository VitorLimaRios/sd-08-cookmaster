const express = require('express');
const router = express.Router();
const {
  validate,
  validateUserEmail,
  validateEmailFormat
} = require('../middlewares/usersMiddleware');

const UserController = require('../controllers/UsersController');

router.post('/',
  validate,
  validateUserEmail,
  validateEmailFormat,
  UserController.createUser
);

module.exports = router;
