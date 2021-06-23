const express = require('express');
const ImagesController = require('../controllers/Images.controller');

const router = express.Router();

router.get('/images/:image', ImagesController.show);

module.exports = router;