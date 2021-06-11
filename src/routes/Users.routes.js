const express = require('express');
const UsersController = require('../controllers/Users.controller');

const router = express.Router();

router.post('/users', UsersController.create);

module.exports = router;