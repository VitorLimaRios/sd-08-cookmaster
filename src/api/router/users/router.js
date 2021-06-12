const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  addUsers,
} = require('../../controllers/users/users');

router.get('/', getAllUsers);

router.post('/', addUsers);

module.exports = router;
