const { Router } = require('express');
const { validateUsers } = require('../middlewares/validateUsers');

const usersController = Router();
const users = require('../services/user');

usersController.get('/', users.get);
usersController.post('/', validateUsers, users.post);

module.exports = usersController;
