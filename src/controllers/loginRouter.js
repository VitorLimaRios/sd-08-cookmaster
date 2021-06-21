const express = require('express');
const router = express.Router();
const login = require('../services/user/login');

router.post('/', async (req, res, next) => {
  const data = req.body;
  console.log('post ');
  await login(data, res , next);
});
module.exports = router;