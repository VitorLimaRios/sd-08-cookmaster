const express = require('express');
const validateJWT = require('../controllers/validateJWT');
const createRecipe = require('../controllers/createRecipe');
const router = express.Router();

router.post('/recipes', validateJWT, createRecipe);

module.exports = router;