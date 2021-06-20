const express = require('express');
const bodyParser = require('body-parser');
const serviceRecipes =require('../services/serviceRecipes');
const auth = require('../middlewares/auth');

const router =  express.Router();
router.use(bodyParser.json());

const STATUS_200 =  200;

router.post('/', auth,  async (req, res) => {
  let recipes = req.body;
  recipes = {...recipes, userId: req.user._id };

  const result = await serviceRecipes.createRecipes(recipes);

  res.status(result.code).send(result.message);
});

router.get('/', async (req, res) => {
  const recipes = await serviceRecipes.getAllRecipes();
  return res.status(STATUS_200).send(recipes);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await serviceRecipes.getRecipeById(id);
  res.status(result.code).send(result.message);
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const  user = req.user;
  const recipe =  req.body;
  const result = await serviceRecipes.updateRecipe(id, recipe, user);
  res.status(result.code).send(result.message);
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const result = await serviceRecipes.deleteRecipe(id);
  res.status(result.code).send(result.message);

});

module.exports = router;
