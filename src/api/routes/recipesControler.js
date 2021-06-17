const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const {
  registerRecipe
} = require('../service/recipesService');
const { decodeToken } = require('../service/jwt');

const app = express();

app.use(bodyParser.json());

const router = express.Router();

// 2 - Crie um endpoint para o login de usuários
router.post('/', decodeToken, rescue(async(req, res) => {
  const { body, headers, user } = req;
  const end = await registerRecipe(body, user, res);
  return end;
}));

module.exports = { router };