const express = require('express');
const router = express.Router();
const validateJWT = require('../auth/validateJWT');

const recipesService = require('../services/recipesService');
const ERROR_CODE = 404;
const STATUS_OK = 200;

router.post('/', validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const body = await recipesService.insertRecipe(name, ingredients, preparation, _id);

  if(body.error) return res.status(body.status).json(body.error);

  return res.status(body.status).json(body.data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await recipesService.findById(id);

  if(!product) return res
    .status(ERROR_CODE)
    .json({ message: 'recipe not found' });

  return res.status(product.status).json(product.data);
});

router.get('/', async (_req, res) => {
  const data = await recipesService.getAll();

  if(!data) return res
    .status(ERROR_CODE)
    .json({err: { code: 'invalid_data', message: 'Something went wrong' } });

  return res.status(STATUS_OK).json(data.recipes);
});

// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;

//   const product = await recipesService.findById(id);

//   const correctName = name? name : product.data.name;
//   const correctQuantity = quantity !== undefined ? quantity : product.data.quantity;

//   const data = await recipesService.updateByID(id, correctName, correctQuantity);

//   if(data.err) return res.status(data.status).json(data);

//   if (!data) return res
//     .status(ERROR_CODE)
//     .json({err: { code: 'invalid_data', message: 'Wrong id format' } });


//   return res.status(data.status).json(data.message);
// });

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   const product = await recipesService.findById(id);
//   const data = await recipesService.deleteByID(id);

//   if(!data) return res
//     .status(ERROR_CODE)
//     .json({err: { code: 'invalid_data', message: 'Wrong id format' } });

//   return res.status(data.status).json(product.data);
// });

module.exports = router;
