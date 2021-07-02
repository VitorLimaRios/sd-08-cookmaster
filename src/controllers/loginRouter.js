const express = require('express');
const router = express.Router();
const login = require('../services/user/login');

router.post('/', async (req, res) => {
  const data = req.body;
  console.log('post - login');
  console.log(data);
  const result = await login(data);
  const {message , code } = result;
  res = res.status(code).json( message);
});
module.exports = router;