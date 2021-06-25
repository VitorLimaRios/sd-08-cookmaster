const HTTP_OK_STATUS = 201;
const express = require('express');
const router = express.Router();
const createUsers = require('../services/user/createUsers');
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
router.post('/', async (req, res, next) => {
  const data = req.body;
  console.log('post ');
  const result = await createUsers(data);
  const {message , code } = result;
  if(code ===HTTP_OK_STATUS){
    res = res.status(code).json({user: message});
    return;
  }
  res = res.status(code).json({message});
  next();
});
// router.get('/', async (_req, res, next)=>{
//   console.log('get ');
//   await readSales(_req,res,next);
// });

module.exports = router;