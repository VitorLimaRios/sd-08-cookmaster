const express = require('express');
const Recipes = require('../controllers/Recipes');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/:id', Recipes.getById);
router.put('/:id', validateJWT, Recipes.update);
router.delete('/:id', validateJWT, Recipes.remove);
router.get('/', Recipes.get);
router.post('/', validateJWT, Recipes.create);

module.exports = router;