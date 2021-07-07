const express = require('express');
const router = express.Router();

const Users = require('../controllers/users');

router.post('/', Users.addUser);

module.exports = router;
