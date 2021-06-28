const HTTP_OK_STATUS = 201;
const express = require('express');
const router = express.Router();
const createUsers = require('../services/user/createUsers');
const createAdmin = require('../services/user/createAdmin');
// const readSalesById = require('../services/readSalesById');
// const readSales = require('../services/readSales');
// const updateSales = require('../services/updateSales');
// const deleteSales = require('../services/deleteSales');
// router.get('/:id', async (req, res, next)=>{
//   const id = (req.params.id);
//   console.log('get id ' +id);
//   await readSalesById(id ,res,next);
// });
// router.put('/:id', async (req, res, next) => {
//   const data = req.body;
//   const id = (req.params.id);
//   console.log('put id ' +id);
//   await updateSales( id, data , res , next);
// });
// router.delete('/:id', async (req, res, next) => {
//   const id = (req.params.id);
//   console.log('delete id ' +id);
//   await deleteSales( id, res , next);
// });
router.post('/admin', async (req, res) => {
  const data = req.body;
  const token = req.headers['authorization'];
  console.log('post admin ');
  const result = await createAdmin(data,token);
  const {message , code } = result;
  res = res.status(code).json(message);
  // console.log(message);
  return;
});
router.post('/', async (req, res, next) => {
  const data = req.body;
  console.log('post / normal user');
  const result = await createUsers(data);
  const {message , code } = result;
  res = res.status(code).json(message);
  // console.log(message);
  next();
});
// router.get('/', async (_req, res, next)=>{
//   console.log('get ');
//   await readSales(_req,res,next);
// });

module.exports = router;