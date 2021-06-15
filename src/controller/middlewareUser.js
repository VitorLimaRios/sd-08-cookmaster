const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const router = express.Router();

const userService = require('../service/userService');

router.use(bodyParser.json());

router.post('/', rescue ( async (req, res, next) => {
  const data = req.body;
  

  const addNewUser = await userService.addNewUser(data);

  const { message, code, erro } = addNewUser;

  if (erro) return next(erro);
  
  return res.status(code).json({ user: message });
}));

router.use((err, _req, res, _next) => {
  const { message, code } = err;

  res.status(code).json({ message });
});

module.exports = router;
