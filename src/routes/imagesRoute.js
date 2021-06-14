const express = require('express');
const getImage = require('../controllers/getImage');

const router = express.Router();
router.get('/images/:filename', getImage);

module.exports = router;
