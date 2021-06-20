const express = require('express');

const validateJWT = require('../api//auth/validateJWT');

const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

const controllers = require('../controllers/RecipeController');

router.post('/', validateJWT, controllers.create);
router.get('/', controllers.getAll);
router.get('/:id', controllers.getById);

module.exports = router;