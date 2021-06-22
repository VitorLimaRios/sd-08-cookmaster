const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const router = express.Router();

const userService = require('../service/recipesService');
const validateJwt = require('../service/authenticToken');

router.use(bodyParser.json());

router.post('/', validateJwt, rescue ( async (req, res, next) => {
  const data = req.body;
  const { id } = req.headers;

  const addNewRecipe = await userService.addRecipe(data, id);

  const { message, code, erro } = addNewRecipe;

  if (erro) return next(erro);
  
  return res.status(code).json({ recipe: message });
}));

router.get('/', async (_req, res) => {
    const getAll = await userService.findAllRecipes();
  
    const { message, code } = getAll;
  
    return res.status(code).json(message);
  });

router.use((err, _req, res, _next) => {
  const { message, code } = err;

  res.status(code).json({ message });
});

module.exports = router;