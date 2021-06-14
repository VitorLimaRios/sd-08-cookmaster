const express = require('express');
const rescue = require('express-rescue');
const { validateEmail, validateForm } = require('../Middlewares/form');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.post('/',
  validateForm, 
  rescue(validateEmail),
  controller.register);

module.exports = router;