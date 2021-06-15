const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  addUsers,
  loginUsers,
} = require('../../controllers/users/users');

router.get('/users', getAllUsers);

router.post('/users', addUsers);

router.post('/login', loginUsers);

module.exports = router;
