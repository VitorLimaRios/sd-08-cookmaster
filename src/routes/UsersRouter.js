const router = require('express').Router();
const UsersControllers = require('../controllers/UsersControllers');

router.post('/', UsersControllers.registerUsers);

module.exports = router;