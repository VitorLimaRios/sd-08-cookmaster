const express = require('express');
const bodyParser = require('body-parser');
const service =require('../services/serviceUsers');

const router =  express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res) => {
  const  credentials  = req.body;
  console.log('credentials', credentials);

  const result = await service.loginUser(credentials);

  res.status(result.code).send(result.message);
});

module.exports = router;
