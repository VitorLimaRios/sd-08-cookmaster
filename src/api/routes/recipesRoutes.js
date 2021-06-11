const express = require('express');
const { validateJWT } = require('../../middlewares/validateJWT');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

router.post('/', validateJWT, recipeController.create);
router.get('/', recipeController.getAll);

module.exports = router;
