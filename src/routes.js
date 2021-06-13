const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');
const UserValidator = require('./validators/UserValidator');

router.post('/users', UserValidator.signup, UserController.addUser);
router.post('/login', UserValidator.login, UserController.login);

module.exports = router;
