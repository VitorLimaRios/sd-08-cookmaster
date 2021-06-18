const { Router } = require('express');
const UserController = require('./users/controllers/User');

const router = Router();

router.get('/', UserController.index);
router.post('/', UserController.store);

module.exports = router;
