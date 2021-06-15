const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const router = express.Router();

const userService = require('../service/userService');

router.use(bodyParser.json());

router.post('/', rescue ( async (req, res, next) => {
  const data = req.body;
  
  const loginUser = await userService.loginUser(data);

  
  const { message, code, erro } = loginUser;
  
  if (erro) return next(erro);

  return res.status(code).json({ token: message });
}));

router.use((err, _req, res, _next) => {
  const { message, code } = err;

  res.status(code).json({ message });
});

module.exports = router;