const express = require('express');
const router = express.Router();
const recipeModel = require('../models/recipeModel');
const {status, message} = require('../services/statusAndMessages');
const authService = require('../services/authService');
const recipeService = require('../services/recipeService');
const {recipeCheck} = recipeService;

router.post('/', authService, recipeCheck, async (req, res) => {
  try {
    const {name, ingredients, preparation} = req.body;
    // console.log(req.user);
    const userId = req.user._id;
    const result = await recipeModel
      .addRecipe(userId, name, ingredients, preparation);
    res.status(status.CREATED).json({recipe: result});
    
  } catch (error) {
    console.error(error.message);
    res.status(status.SERVER_ERROR).json(message.SERVER_ERROR);
  }
});

module.exports = router;