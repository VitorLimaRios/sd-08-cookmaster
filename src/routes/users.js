const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const middlewares = require('../middlewares');

router.post('/', UserController.create);
router.post('/admin', middlewares.auth, UserController.createAdmin);

module.exports = router;
