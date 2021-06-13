const express = require('express');

const recipesController = require('../controllers/recipesController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, recipesController.registerRecipe);

module.exports = router;