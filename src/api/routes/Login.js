const express = require('express');
const Controller = require('../controllers').Login;
const isBodyValidFor = require('../middlewares/validations').Login;
const { notFoundHandler } = require('../middlewares/');

const route = express.Router();

route.post('/', isBodyValidFor('insert'), Controller.login);

route.use('/:notFound', notFoundHandler);

module.exports = route;
