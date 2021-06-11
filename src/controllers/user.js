const { Router } = require('express');

const usersController = Router();
const users = require('../services/user');

usersController.get('/', users.get);
usersController.post('/', users.post);

module.exports = usersController;
