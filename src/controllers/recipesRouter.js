const express = require('express');
const router = express.Router();
const create = require('../services/recipes/create');
// const readProductById = require('../services/readProductById');
const read = require('../services/recipes/readAll');
// const updateProduct = require('../services/updateProduct');
// const deleteProduct = require('../services/deleteProduct');
router.get('/:id', async (req, res, next)=>{
  const id = (req.params.id);
  await readProductById(id ,res,next);
});
// router.put('/:id', async (req, res, next) => {
//   const data = req.body;
//   const id = (req.params.id);
//   await updateProduct( id, data , res , next);
// });
// router.delete('/:id', async (req, res, next) => {
//   const id = (req.params.id);
//   await deleteProduct( id, res , next);
// });
router.post('/', async (req, res, next) => {
  const data = req.body;
  const token = req.headers['authorization'];
  await create(data, res,token , next);
});
router.get('/', async (_req, res, next)=>{
  await read(_req,res,next);
});

module.exports = router;