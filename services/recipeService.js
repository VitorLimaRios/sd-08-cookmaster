const model = require('../models/recipeModel');

const getAll = async () => model.getAll();

const getById = async (id) => {
  const recipe = await model.getById(id);
  if (!recipe || recipe === null) {
    return { message: 'recipe not found' };
  }
  return recipe;
}; 

const create = async (recipes, authorization) => {
  const DOZE = 12;
  const { name, ingredients, preparation } = recipes; 
  if (!name || !ingredients || !preparation) {
    return {      
      message: 'Invalid entries. Try again.'   
    };
  }  
  if (authorization.length < DOZE) {
    return {      
      message: 'jwt malformed'   
    };    
  }
  return model.create(recipes, authorization);
};  

const update = async (id, recipe, authorization) => {
  if (!recipe) {
    return {      
      message: 'missing auth token'   
    };
  }  
  if (!authorization) {
    return {      
      message: 'jwt malformed'   
    };    
  }
  return model.update(id, recipe, authorization);
};

const exclude = async (id, authorization) => {
  if (!authorization) {
    return {      
      message: 'missing auth token'   
    };    
  }
  return model.exclude(id);
}; 
  
module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};