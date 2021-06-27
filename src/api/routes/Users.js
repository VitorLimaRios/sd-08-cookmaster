const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/Users');

router.post('/', UsersControllers.createUsers);

module.exports = router; 