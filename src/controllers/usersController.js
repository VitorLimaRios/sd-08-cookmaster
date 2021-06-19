const express = require('express');
const bodyParser = require('body-parser');
const service = require('../services/serviceUsers');

const router =  express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res) => {
  const  { name, email, password } = req.body;
  const result = await service.createUser({name, email, password });
  res.status(result.code).send(result.message);
});

module.exports = router;
