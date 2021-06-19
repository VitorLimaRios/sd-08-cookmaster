const { Router } = require('express');
const UserController = require('./users/controllers/User');

const router = Router();

router.get('/users', UserController.index);
router.post('/users', UserController.store);

router.post('/login', UserController.login);

module.exports = router;
