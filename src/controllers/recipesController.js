const express = require('express');
const router = express.Router();
const recipesValidation = require('../middlewares/recipesValidation');
const { verifyJwt } = require('../middlewares/jwtValidation');
const recipesServices = require('../services/recipesServices');
const multer = require('multer');

const code = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

const recipesController = async (req, res) => {
  const {name, ingredients, preparation} = req.body;
  const validation = await recipesValidation
    .controlValidation(name, ingredients, preparation);

  if(validation.message) 
    return res.status(code.BAD_REQUEST).json(validation);

  const user = req.user;
  const addRecipes = await recipesServices.addRecipes(req.body, user);

  if(addRecipes.message) 
    return res.status(code.CONFLICT).json(addRecipes);

  return res.status(code.CREATED).json({recipe: addRecipes});

};

const getAllRecipes = async (req, res) => {
  const getAll = await recipesServices.getAllRecipes();
  return res.status(code.OK).json(getAll);
};

const getRecipesByID = async (req, res) => {
  const { id } = req.params;
  const filterIdRecipes = await recipesServices.getById(id);

  if(filterIdRecipes.message) {
    return res.status(code.NOT_FOUND).json(filterIdRecipes);
  }

  return res.status(code.OK).json(filterIdRecipes);
};

const recipeUpdate = async (req, res) => {
  const {id} = req.params;
  const updateRecipes = await recipesServices.updateRecipes(req.body, id);

  if(updateRecipes.message) 
    return res.status(code.CONFLICT).json(updateRecipes);

  return res.status(code.OK).json(updateRecipes);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const deleteRecipes = await recipesServices.excludeRecipe(id);

  return res.status(code.NO_CONTENT).json();
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  }
});

const upload = multer({storage});

const saveImage = async (req, res) => {
  const { id } = req.params;
  const urlImage = `localhost:3000/src/uploads/${id}.jpeg`;
  const saveImage = await recipesServices.saveImageById(id, urlImage);

  res.status(code.OK).json(saveImage);
};

router.post('/', verifyJwt, recipesController);
router.get('/', getAllRecipes);
router.get('/:id', getRecipesByID);
router.put('/:id', verifyJwt, recipeUpdate);
router.delete('/:id', verifyJwt, deleteRecipe );
router.put('/:id/image', verifyJwt, upload.single('image'), saveImage);

module.exports = router;
