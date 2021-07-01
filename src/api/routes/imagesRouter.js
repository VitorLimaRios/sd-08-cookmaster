const express = require('express');
const imagesController = require('../controllers/imagesController');

const imagesRouter = express.Router();

imagesRouter.get('/:image', imagesController.getImage);

module.exports = imagesRouter;
