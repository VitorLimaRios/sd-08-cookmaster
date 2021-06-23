const jwt = require('jsonwebtoken');
const status = require('../statuscode/status');

const validateAllRecipes = (req, res, next) => {
  const {name, ingredients, preparation} = req.body;
  try{
    if(!name || !ingredients || !preparation){
      return res.status(status.BAD_REQUEST).json({message: status.INVALID_ENTRIES});
    } 
  }catch(err){
    return res.status(status.INTERNAL_SERVER_ERROR).json({message: 'erro na validação'});
  }
  next();
};

module.exports ={
  validateAllRecipes
};