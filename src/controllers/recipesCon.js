const express = require('express');
const router = express.Router();
const middlewares_recipes = require('../middlewares/recipesValidation');
const { validJWT } = require('../middlewares/validateJWT');
const recipesServices = require('../services/recipesSer');
const multer = require('multer');

const code = {
  code200: 200,
  code201: 201,
  code204: 204,
  code400: 400,
  code401: 401,
  code404: 404,
  code409: 409,
};

const recipesController = async (req, res) => {
  const {name, ingredients, preparation} = req.body;
  console.log('req.body recipesController line 11', name, ingredients, preparation);

  const messageControlValidation = await middlewares_recipes
    .controlValidation(name, ingredients, preparation);
  console.log('const isNameValid line 14', messageControlValidation);
  if(messageControlValidation.message) 
    return res.status(code.code400).json(messageControlValidation);

  const user = req.user;
  console.log('user line 24', user);
  
  const addRecipes = await recipesServices.addRecipes(req.body, user);
  console.log('addUsers usersCon line 23', addRecipes);
  if(addRecipes.message) 
    return res.status(code.code409).json(addRecipes);

  return res.status(code.code201).json({recipe: addRecipes});

};

const recipesGetAll = async (req, res) => {

  const getAll = await recipesServices.getAllRecipes();

  return res.status(code.code200).json(getAll);

};

const recipesGetById = async (req, res) => {
  const { id } = req.params;

  const filterIdRecipes = await recipesServices.getById(id);
  console.log('------------'); 
  console.log('filterIdRecipes Controller', filterIdRecipes);

  if(filterIdRecipes.message) {
    console.log('------------'); 
    console.log('entrou no if ID INCORRETO');
    return res.status(code.code404).json(filterIdRecipes);
  }

  return res.status(code.code200).json(filterIdRecipes);
};

const recipeUpdate = async (req, res) => {
  const {name, ingredients, preparation} = req.body;
  const {id} = req.params;
  console.log('------------'); 
  console.log('recipeUpdate line 61 req.body', name, ingredients, preparation, id);
 
  const updateRecipes = await recipesServices.updateRecipes(req.body, id);
  console.log('updateRecipes recipesCon line 75', updateRecipes);
  
  if(updateRecipes.message) 
    return res.status(code.code409).json(updateRecipes);

  return res.status(code.code200).json(updateRecipes);
};

const recipeDelete = async (req, res) => {
  const { id } = req.params;
  console.log('req.params', id);

  const deleteRecipes = await recipesServices.exclude(id);

  // console.log('deleteRecipes', deleteRecipes);

  return res.status(code.code204).json();

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

  console.log('id and urlImage', id, urlImage);

  const saveImageById = await recipesServices.saveImageById(id, urlImage);

  console.log('saveImageById', saveImageById);

  console.log('saveImage req.body and req.file', req.body, req.file);
  res.status(code.code200).json(saveImageById);
};

router.post('/', validJWT, recipesController);
router.get('/', recipesGetAll);
router.get('/:id', recipesGetById);
router.put('/:id', validJWT, recipeUpdate);
router.delete('/:id', validJWT, recipeDelete );
router.put('/:id/image', validJWT, upload.single('image'), saveImage);

module.exports = router;
