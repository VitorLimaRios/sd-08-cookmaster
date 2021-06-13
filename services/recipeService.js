const model = require('../models/recipeModel');

const getAll = async () => model.getAll();

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
  
module.exports = {
  getAll,
  create,
};