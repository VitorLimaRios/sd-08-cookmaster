const express = require('express');
const rescue = require('express-rescue');
const usersControllers = require('../controllers/usersControllers');

const router = express.Router();

router.post('/users', rescue(usersControllers.createUser));
router.get('/users', rescue(usersControllers.getAllUsers));

module.exports = router;
