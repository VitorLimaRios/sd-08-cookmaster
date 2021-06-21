const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const validatejwt =require('../api/auth/validateJWT');
const {
  validarecipies,
  getAllrecipies,
  getOneRecipe,
} = require('../services/recipesService');

const cc = 200;
const cci=201;
const cd = 400;
const cdi = 401;
const cdiv=404;

router.post('/', validatejwt,async(req, res) => {
 
  const result = await validarecipies(req.body,req.user);
  let dinamic = result.message ? cd : cdi;
  if(result.recipe){dinamic = cci;};  
  res.status(dinamic).send(result);
  return;
});

router.get('/', async(req, res) => {
  const recipiesList = await getAllrecipies(); //all
  //dinamic = recipiesList?cc:cdi;
  res.status(cc).send(recipiesList);
});


router.get('/:id', async(req, res) => {
  const recipe = await getOneRecipe(req.params.id);
  dinamic = recipe.message?cdiv:cc;
  return res.status(dinamic).send(recipe);
});


router.put('/', async(req, res) => {
  res.send('put');
});
router.delete('/', async(req, res) => {
  res.send('delete');
});



module.exports = router;