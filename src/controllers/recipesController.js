const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const validatejwt =require('../api/auth/validateJWT');
const {validarecipies} = require('../services/recipesService');

const cd = 400;
const cdi = 401;
const cc = 200;
const cci=201;


router.post('/', validatejwt,async(req, res) => {
 
  const result = await validarecipies(req.body,req.user);
  let dinamic = result.message ? cd : cdi;
  if(result.recipe){dinamic = cci;};  
  res.status(dinamic).send(result);
});

router.get('/', async(req, res) => {
  const recipiesList = getAllrecipies();
  res.send('get');
});
router.put('/', async(req, res) => {
  res.send('put');
});
router.delete('/', async(req, res) => {
  res.send('delete');
});



module.exports = router;