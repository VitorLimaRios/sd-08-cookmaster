const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const usersService = require('../services/usersService');

const notFoundStatus = 400;
const duplicatedStatus = 409;
const sucessStatus = 201;

router.post('/', async (req, res, next) => {
  const { body } = req;
  const newUser = await usersService.validateUser(body);

  if (newUser.isJoi) {
    return res.status(notFoundStatus).send({
      message: 'Invalid entries. Try again.'
    });
  } else if (newUser.message) {
    return res.status(duplicatedStatus).send(newUser);
  }

  const { name, email, role, _id } = newUser;

  const newUserToResponse = {
    user: {
      name,
      email,
      role,
      _id,
    }
  };
  res.status(sucessStatus).json(newUserToResponse);
});

module.exports = router;
