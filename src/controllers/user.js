const user = require('../models/user');
const { Router } = require('express');

const usersController = Router();
const usersServices = require('../services/user');

const OK = 200;
const CREATED = 201;


usersController.get('/', usersServices.get);

usersController
  .post('/', usersServices.post);

module.exports = usersController;
