const express = require('express');
const UsersController = require('../controllers/Users.controller');
const AdminsController = require('../controllers/Admins.controller');

const AdminsMiddleware = require('../middlewares/Admins.middleware');

const router = express.Router();

router.post('/users', UsersController.create);

router.post('/users/admin', AdminsMiddleware, AdminsController.create);

module.exports = router;