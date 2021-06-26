const HTTP_OK_STATUS = 201;
const express = require('express');
const router = express.Router();
const create = require('../services/recipes/create');
const readById = require('../services/recipes/readById');
const read = require('../services/recipes/readAll');
const update = require('../services/recipes/update');
const deleteRecipe = require('../services/recipes/delete');
router.get('/:id', async (req, res)=>{
  console.log('Get recipes/:id - read by id');
  const id = (req.params.id);
  const result = await readById(id);
  const {message , code } = result;
  res = res.status(code).json(message);
  return;
});
router.put('/:id', async (req, res) => {
  console.log('PUT recipes/:id - update by id');
  const data = req.body;
  const id = (req.params.id);
  const token = req.headers['authorization'];
  const result = await update( id, data, token);
  const {message , code } = result;
  res = res.status(code).json(message);
  return;
});
router.delete('/:id', async (req, res, next) => {
  
  console.log('DELETE recipes/:id - delete by id');
  const id = (req.params.id);
  const token = req.headers['authorization'];
  const result = await deleteRecipe( id, token);
  const {message , code } = result;
  res = res.status(code).json(message);
  console.log(message);
  return;
});
router.post('/', async (req, res) => {
  console.log('post recipes/ liso - create');
  const data = req.body;
  const token = req.headers['authorization'];
  const result =  await create(data, token );
  const {message , code } = result;
  if(code ===HTTP_OK_STATUS){
    res = res.status(code).json({recipe: message});
    return;
  }
  res = res.status(code).json({message});
  return;
});
router.get('/', async (_req, res, )=>{
  console.log('Get recipes/ liso - read all');
  const result =  await read();
  const {message , code } = result;
  res = res.status(code).json({...message});
  return;
});

module.exports = router;