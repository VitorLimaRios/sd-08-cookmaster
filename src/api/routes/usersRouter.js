const express = require('express');
const usersController = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.post('/', usersController.createUser);

module.exports = usersRouter;
