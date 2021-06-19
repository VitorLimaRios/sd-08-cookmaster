const express = require('express');
const router = express.Router();

const loginService = require('../services/loginService');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const body = await loginService.login(email, password);

  if(body.error) return res.status(body.status).json(body.error);

  return res.status(body.status).json(body.data);
});

module.exports = router;
