const express = require('express');
const bodyParser = require('body-parser');
const serviceRecipes =require('../services/serviceRecipes');
const auth = require('../middlewares/auth');

const router =  express.Router();
router.use(bodyParser.json());

const STATUS_200 =  200;

router.post('/', auth,  async (req, res) => {
  const recipes = req.body;

  // if(Object.keys(recipes).length === 0){
  //   console.log('body vazio');
  //   const recipes = await serviceRecipes.getAllRecipes();
  //   return res.status(STATUS_200).send(recipes);
  // }

  const result = await serviceRecipes.createRecipes(recipes);

  result.message.recipe = {...result.message.recipe, userID: req.user._id };

  res.status(result.code).send(result.message);
});

router.get('/', async (req, res) => {
  const recipes = await serviceRecipes.getAllRecipes();
  return res.status(STATUS_200).send(recipes);
});

module.exports = router;
