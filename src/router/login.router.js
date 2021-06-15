const express = require('express');
const rescue = require('express-rescue');
const { validateLogin } = require('../Middlewares/form');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.post('/', validateLogin, controller.login);

module.exports = router;