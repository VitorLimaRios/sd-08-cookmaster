const router = require('express').Router();
const UsersController = require('../controllers/users');

router.post('/', UsersController.create);


module.exports = router;
