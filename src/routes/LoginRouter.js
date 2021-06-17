const router = require('express').Router();
const LoginControllers = require('../controllers/LoginControllers');

router.post('/', LoginControllers.checkUserInBank);

module.exports = router;