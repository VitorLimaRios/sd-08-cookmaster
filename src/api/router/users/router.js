const express = require('express');
const router = express.Router();

const validateJWT = require('../../middlewares/jwt/validateJwt');

const {
  getAllUsers,
  addUsers,
  loginUsers,
  registerRec,
} = require('../../controllers/users/users');

router.get('/users', getAllUsers);

router.post('/users', addUsers);

router.post('/login', loginUsers);

router.post('/recipes', validateJWT, registerRec);

module.exports = router;
