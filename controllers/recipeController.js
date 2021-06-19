const { Router } = require('express');
const service = require('../services/recipeService');
const serviceLogin = require('../services/loginService');

const secret = require('../utils/crypto');

const jwt = require('jsonwebtoken');

const jwtConfig = { 
  expiresIn: '7d',
  algorithm: 'HS256',
};

const rescue = require('express-rescue');
const router = Router();

const STATUS_200 = 200;
const STATUS_201 = 201;
const STATUS_204 = 204;
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

router.put('/:id', rescue (async (req, res) => {  
  const { authorization } = req.headers; 
  const { id } = req.params;
  const recipe = await service.update(id, req.body, authorization);
  const update = { ...recipe, userId: id };
  if (recipe.message === 'jwt malformed') return res.status(STATUS_401).json(recipe);
  if (recipe.message === 'missing auth token') return res.status(STATUS_401).json(recipe);

  res.status(STATUS_200).json(update); 
}));


router.delete('/:id', async (req, res) => {
 
  const { authorization } = req.headers; 

  const { id } = req.params;
  const recipe = await service.exclude(id, authorization);

  if (recipe.message === 'missing auth token') return res.status(STATUS_401).json(recipe);

  res.status(STATUS_204).end();        
  
});

router.put('/:id/image', rescue (async (req, res) => {  
  const { authorization } = req.headers; 
  const { id } = req.params;
  const recipe = await service.getById(id);
  const update = { 
    ...recipe, userId: id, image: `localhost:3000/src/uploads/${id}.jpeg` 
  };
  const updatedRecipe = await service.update(id, update, authorization); 
  if (updatedRecipe.message === 'missing auth token') {
    res.status(STATUS_401).json(updatedRecipe);     
  }  

  res.status(STATUS_200).json(updatedRecipe); 
}));  

module.exports = router;