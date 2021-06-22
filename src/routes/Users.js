const express = require('express');
const Users = require('../controllers/Users');

const router = express.Router();

router.post('/', Users.create);

module.exports = router;