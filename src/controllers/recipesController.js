const express = require('express');
const bodyParser = require('body-parser');
const serviceRecipes =require('../services/serviceRecipes');
const auth = require('../middlewares/auth');

const router =  express.Router();
router.use(bodyParser.json());


router.post('/', auth,  async (req, res) => {
  const recipes = req.body;

  const result = await serviceRecipes.createRecipes(recipes);

  result.message.recipe = {...result.message.recipe, userID: req.user._id };

  res.status(result.code).send(result.message);
});

module.exports = router;
