const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const multer = require('multer');
const { resolve } = require('path');
const path = require('path');

const {
  registerRecipe,
  findAllRecipes,
  findRecipe,
  tryUpdate,
  findToDelete,
  addImage
} = require('../service/recipesService');
const { decodeToken } = require('../service/jwt');
// const { upload } = require('../app');

const app = express();

app.use(bodyParser.json());

const router = express.Router();

// 3 - Crie um endpoint para o cadastro de receitas
router.post('/', rescue(decodeToken), rescue(async(req, res) => {
  const { body, user } = req;
  const end = await registerRecipe(body, user, res);
  return end;
}));

// 5 - Crie um endpoint para visualizar uma receita específica
router.get('/:id', rescue(async (req, res) => {
  const end = await findRecipe(req, res);
  return end;
}));

// 4 - Crie um endpoint para a listagem de receitas
router.get('/', rescue(async (_req, res) => {
  const end = await findAllRecipes(res);
  return end;
}));

//9 - Crie um endpoint para a adição de uma imagem a uma receita


// 7 - Crie um endpoint para a edição de uma receita
router.put(
  '/:id',
  rescue(decodeToken),
  rescue(async (req, res) => {
    const end = await tryUpdate(req, res);
    return end;
  }));

// 8 - Crie um endpoint para a exclusão de uma receita
router.delete('/:id',rescue(decodeToken), rescue(async (req, res) => {
  const end = await findToDelete(req, res);
  return end;
}));

module.exports = { router };