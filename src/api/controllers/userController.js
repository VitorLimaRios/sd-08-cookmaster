const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
// const userService = require('../services/userService');
// const {} = userService;

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const ERROR_SERVER = 500;
const messageErrorServer = {message: 'Sistema Indisponível'};

router.post('/', async(req, res) =>{
  const {name, email, password} = req.body;
  try {
    const result = await userModel.addUser(name, email, password);
    res.status(STATUS_CREATED).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(ERROR_SERVER).send(messageErrorServer);
  }
});

router.get('/', async(req, res) => {
  try {
    const result = await userModel.getAll();
    res.status(STATUS_OK).json({result});
  } catch (error) {
    console.error(error.message);
    res.status(ERROR_SERVER).send(messageErrorServer);
  }
});

module.exports = router;