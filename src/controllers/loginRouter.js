const express = require('express');
const router = express.Router();
const login = require('../services/user/login');

router.post('/', async (req, res, next) => {
  const data = req.body;
  console.log('post ');
  const result = await login(data);
  const {message , code } = result;
  res = res.status(code).json( message);
  // console.log(message);
});
module.exports = router;