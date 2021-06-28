const express = require('express');
const router = express.Router();
const readByIdImage = require('../services/recipes/readByIdImage');
const readById = require('../services/recipes/readById');


// router.get('images/:id', async (req, res)=>{
//   console.log('Get recipes/images/:id - read image by id');
//   const id = (req.params.id);
//   const result = await readById(id);
//   const {message , code } = result;
//   console.log(message);
//   res = res.status(code).json(message.image);
//   return;
// });


router.post('/', async (req, res) => {
  console.log('Get recipes/images/:id - read image by id');
  const id = (req.params.id);
  console.log('#####################',id ,'#####################');
  const result = await readById(id);
  const {message , code } = result;
  console.log(message);
  res = res.status(code).json( message.image);
  // console.log(message);
});
module.exports = router;