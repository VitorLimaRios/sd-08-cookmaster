const HTTP_OK_STATUS = 201;
const express = require('express');
const router = express.Router();
const createUsers = require('../services/user/createUsers');
const createAdmin = require('../services/user/createAdmin');

router.post('/admin', async (req, res) => {
  const data = req.body;
  const token = req.headers['authorization'];
  console.log('post admin ');
  const result = await createAdmin(data,token);
  const {message , code } = result;
  res = res.status(code).json(message);
  return;
});
router.post('/', async (req, res, next) => {
  const data = req.body;
  console.log('post / normal user');
  const result = await createUsers(data);
  const {message , code } = result;
  res = res.status(code).json(message);
  next();
});

module.exports = router;