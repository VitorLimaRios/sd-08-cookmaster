const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');
const middlewares = require('../middlewares');

router.post('/', middlewares.userValidation, userController.create);

module.exports = router;