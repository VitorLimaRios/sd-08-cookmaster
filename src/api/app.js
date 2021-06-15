const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');

app.use(bodyParser.json());


const storage = multer.diskStorage({
  destination:(callback)=>callback(null,'uploads'),
  filename:(callback)=>callback(null,'zin')
});


const upload = multer(storage);




// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador



module.exports = app;
