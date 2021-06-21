const express = require('express');
const rescue = require('express-rescue');
const usersControllers = require('../controllers/usersControllers');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/users', rescue(usersControllers.createUser));
router.post('/users/admin', validateJWT, rescue(usersControllers.createAdmin));
router.get('/users', rescue(usersControllers.getAllUsers));

module.exports = router;
