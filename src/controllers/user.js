const { Router } = require('express');
const { validateUsers } = require('../middlewares/validateUsers');

const usersController = Router();
const users = require('../services/user');
const admin = require('../services/admin');
const validateToken = require('../auth/validateToken');

usersController.get('/', users.get);
usersController.post('/', validateUsers, users.post);
usersController.post('/admin', validateToken, validateUsers, admin.post);

module.exports = usersController;
