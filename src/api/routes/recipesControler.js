const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const {
  registerRecipe,
  findAllRecipes,
  findRecipe
} = require('../service/recipesService');
const { decodeToken } = require('../service/jwt');

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

module.exports = { router };