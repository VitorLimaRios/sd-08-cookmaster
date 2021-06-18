const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { router: userRouter } = require('./routes/usersControler');
const { router: loginRouter } = require('./routes/loginControler');
const { router: recipesRouter } = require('./routes/recipesControler');
const { decodeToken } = require('./service/jwt');
const { addAdmin } = require('../../seed');
const multer = require('multer');
const { addImage } = require('./service/recipesService');
const rescue = require('express-rescue');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

async function main() {
  try {
    await addAdmin();
    console.log('Admin add com sucesso!');
  } catch (err) {
    console.error(`Erro ao escrever o arquivo: ${err.message}`);
  }
}

main();
//MULTER
app.use('/image', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'src/uploads'),
  filename: (req, file, callback) => {
    console.log('fileMulter', file);
    callback(null, `${req.params.id}.jpeg`);
    console.log('teste');
  }
});

const upload = multer({storage});

app.put('/recipes/:id/image/',
  rescue(decodeToken),
  upload.single('image'),
  rescue(async (req, res) => {
    const end = await addImage(req, res);
    return end;
  }));
// MULTER

app.use('/users', userRouter);

app.use('/login', loginRouter);

app.use('/recipes', recipesRouter);

module.exports = app;


