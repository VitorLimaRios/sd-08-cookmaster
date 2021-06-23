const express = require('express');
const Recipes = require('../controllers/Recipes');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, Recipes.create);
router.get('/', Recipes.get);

module.exports = router;