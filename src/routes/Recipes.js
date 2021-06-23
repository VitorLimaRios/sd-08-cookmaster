const express = require('express');
const Recipes = require('../controllers/Recipes');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/:id', Recipes.getById);
router.put('/:id', validateJWT, Recipes.update);
router.get('/', Recipes.get);
router.post('/', validateJWT, Recipes.create);

module.exports = router;