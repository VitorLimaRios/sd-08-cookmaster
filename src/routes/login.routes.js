const router = require('express').Router();

const useController = require('../controllers/login.controllers');

const { invalidLogin } = require('../middleware/userAuth.middleware');

router.post('/', invalidLogin, useController.SignIn);

module.exports = router;
