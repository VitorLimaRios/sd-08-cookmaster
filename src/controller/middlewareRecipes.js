const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const router = express.Router();

const userService = require('../service/recipesService');

router.use(bodyParser.json());

router.post('/', rescue ( async (req, res, next) => {
  const data = req.body;
  const { id } = req.headers;

  const addNewRecipe = await userService.addRecipe(data, id);

  const { message, code, erro } = addNewRecipe;

  if (erro) return next(erro);
  
  return res.status(code).json({ recipe: message });
}));

router.use((err, _req, res, _next) => {
  const { message, code } = err;

  res.status(code).json({ message });
});

module.exports = router;