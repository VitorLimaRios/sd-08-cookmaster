const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const multer = require('multer');
const { resolve } = require('path');

const router = express.Router();

const userService = require('../service/recipesService');
const validateJwt = require('../service/authenticToken');

router.use(bodyParser.json());
router.use(express.static(resolve(__dirname, '..','uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${ id }.jpeg`);
  },
});

const uploading = multer({ storage });
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

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const getOneById = await userService.findByIdRecipe(id);
  
  const { message, code, erro } = getOneById;

  if (erro) return next(erro);
  
  return res.status(code).json(message);
});

router.put('/:id', validateJwt, rescue ( async (req, res, next) => {
  const data = req.body;
  const { id } = req.headers;
  const idRecipes = req.params.id;

  const update = await userService.roleType(data, idRecipes);  

  const { message, code, erro } = update;

  if (erro) return next(erro);
  
  return res.status(code).json(message);
}));

router.delete('/:id', validateJwt, rescue ( async (req, res, _next) => {
  const idRecipes = req.params.id;

  const deleteOne = await userService.deleteRecipe(idRecipes);  

  const { code } = deleteOne;
  
  return res.status(code).send();
}));

router.put('/:id/image',
  validateJwt,
  uploading.single('image'),
  async (req, res, _next) => {
  const fileName = req.file.filename;
  const { id } = req.params;
  
  const updateImage = await userService.addImage(id, fileName);

  const { message, code } = updateImage;
  
  return res.status(code).json(message);
});

router.use((err, _req, res, _next) => {
  const { message, code } = err;

  res.status(code).json({ message });
});

module.exports = router;