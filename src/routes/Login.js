const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

const controllers = require('../controllers/UserController');

router.post('/', controllers.login);

module.exports = router;