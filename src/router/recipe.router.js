const express = require('express');
const { auth } = require('../Middlewares/auth');
const { upload } = require('../Middlewares/uplead');
const { validateFormRecipes, validateId, userAuth } = require('../Middlewares/form');
const controller = require('../controllers/recipe.controller');

const router = express.Router();

router.route('/')
  .post(auth, 
    validateFormRecipes,
    controller.register)
  .get(controller.findAll);

router.route('/:id')
  .get(validateId,
    controller.findById)
  .put(auth,
    userAuth,
    validateId, 
    validateFormRecipes,
    controller.change)
  .delete(auth,
    userAuth,
    validateId,
    controller.exclude);

router.route('/:id/image/')
  .put(auth,
    userAuth,
    controller.uploadOne, 
    upload.single('image'));


module.exports = router;