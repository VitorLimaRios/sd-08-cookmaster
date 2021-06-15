const { Router } = require('express');
const service = require('../services/recipeService');
const serviceLogin = require('../services/loginService');

const rescue = require('express-rescue');
const router = Router();

const STATUS_200 = 200;
const STATUS_201 = 201;
const STATUS_400 = 400;
const STATUS_401 = 401;
const STATUS_404 = 404;

router.get('/', rescue(async (_req, res) => {
  const recipe = await service.getAll();
  res.status(STATUS_200).json(recipe);
}));

router.get('/:id', async (req, res) => {
  const { id } = req.params;    
  const recipe = await service.getById(id);
 
  if (recipe.message === 'recipe not found') return res.status(STATUS_404).json(recipe);
  
  return res.status(STATUS_200).json(recipe);        
});

router.post('/', rescue(async (req, res) => {
  const { authorization } = req.headers; 
 
  const recipe = await service.create(req.body, authorization);
  try {
    const login = await serviceLogin.getAll();
    const id = login[login.length -1]._id;
    
    const { recipe: { name, ingredients, preparation, _id } } = recipe;
    const result = { name, ingredients, preparation, 'userId': id, _id  };
    return res.status(STATUS_201).json({recipe: result});    
    
  } catch (error) {
    if (recipe.message === 'Invalid entries. Try again.') {
      return res.status(STATUS_400).json(recipe);
    }
    if (recipe.message === 'jwt malformed') {
      return res.status(STATUS_401).json(recipe);
    }
    return res.status(STATUS_400).json(recipe);
  }  
}));

module.exports = router;