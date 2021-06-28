const express = require('express');
const fs = require('fs');
const router = express.Router();
const readByIdImage = require('../services/recipes/readByIdImage');
const readById = require('../services/recipes/readById');
const ERROR_00 =400;
const HTML_OK_STATUS =200;
const quinze =15;

// router.get('images/:id', async (req, res)=>{
//   console.log('Get recipes/images/:id - read image by id');
//   const id = (req.params.id);
//   const result = await readById(id);
//   const {message , code } = result;
//   console.log(message);
//   res = res.status(code).json(message.image);
//   return;
// });


router.get('/:id.jpeg', async (req, res) => {
  console.log('Get recipes/images/:id - read image by id');
  const id = (req.params.id);
  console.log('##################',id ,'##################');
  const result = await readById(id);
  const {message , code } = result;
  console.log(message);
  if (code ===HTML_OK_STATUS){
    // fs.exists(message.image, function (exists){
    //   if(exists){
    //     res.writeHead(code,{
    //       'Content-Type': 'image/jpeg',
    //       'Content-Disposition': 'attachment; filename=' + id+'.jpeg'
    //     });
    //     fs.createReadStream(message.image).pipe(res);
    //     return;
    //   }
    //   res.writeHead(ERROR_00, { 'Content-Type': 'text/plain' });
    //   res.end('ERROR File does not exist');
    //   return;
    // });
    res.download(message.image.slice(quinze));
    return;
  }
  res = res.status(code).json( message.image);
  return;
  // console.log(message);
});
module.exports = router;