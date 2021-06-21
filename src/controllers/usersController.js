const express = require('express');
const userValidation = require('../middlewares/userValidation');
const { createUserService } = require('../services/usersService');
const router = express.Router();

router.post('/', userValidation, async (req, res) => {
  const user = req.body;
  const { status, ...message } = await createUserService(user);
  res.status(status).json(message);
});

module.exports = router;
