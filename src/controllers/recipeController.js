const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads/');
  },      
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const RecipeModel = require('../models/recipeModel');

const { 
  verifyRecipe,
  verifyID,
  validateJWT,
  status,
} = require('../middlewares/validations');

const routes = express.Router();

// Criar receita
routes.post('/', verifyRecipe, validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = await RecipeModel.createRecipe(name, ingredients, preparation, _id);

  return res.status(status.created).json({ recipe });
});

// Listar todas as receitas
routes.get('/', async (_req, res) => {
  const allRecipes = await RecipeModel.getAllRecipes();

  return res.status(status.ok).json(allRecipes);
});

// Procurar uma receita pelo ID
routes.get('/:id', verifyID, async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipeModel.findByIdRecipe(id);

  return res.status(status.ok).json(recipe);
});

// Editar uma receita pelo ID
routes.put('/:id', validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;

  const recipe = await RecipeModel.updateRecipe(id, name, ingredients, preparation);

  return res.status(status.ok).json(recipe);
});

// Remover uma receita pelo ID
routes.delete('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;

  await RecipeModel.removeRecipe(id);

  return res.status(status.noContent).send();
});

// Adicionar uma imagem na receita pelo ID
routes.put('/:id/image/', validateJWT, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const image = `localhost:3000/images/${id}.jpeg`;

  const recipe = await RecipeModel.addImageRecipe(id, image);

  return res.status(status.ok).send(recipe);
});

module.exports = routes;
