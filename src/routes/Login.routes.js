const express = require('express');
const LoginController = require('../controllers/Login.controller');

const router = express.Router();

router.post('/login', LoginController.create);

module.exports = router;