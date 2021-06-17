const express = require('express');
const Controller = require('../controllers').Recipes;
const isBodyValidFor = require('../middlewares/validations').Recipes;
const { notFoundHandler, jwtAuthentication,
  isUserIdOrAdmin, addImage } = require('../middlewares/');

const route = express.Router();

route.put('/:id/image',
  jwtAuthentication('Users'),
  isUserIdOrAdmin,
  addImage,
  Controller.updateById);

route.get('/:id', Controller.findById);

route.put('/:id',
  jwtAuthentication('Users'),
  isUserIdOrAdmin,
  isBodyValidFor('update'),
  Controller.updateById);

route.delete('/:id',
  jwtAuthentication('Users'),
  isUserIdOrAdmin,
  Controller.deleteById);

route.get('/', Controller.getAll);

route.post('/',
  jwtAuthentication('Users'),
  isBodyValidFor('insert'),
  Controller.insertOne);

route.use('/:notFound', notFoundHandler);

module.exports = route;
