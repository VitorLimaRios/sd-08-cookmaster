const { addrecipie, getall, getone } = require('../models/recipesModel');
const { ObjectId } = require('mongodb');

// mensagens a retornar em caso de falha
const notfound = {message: 'recipe not found'};

// sem numeros magicos eslint
const z = 0;
const i = 1;


const validarecipies =async(body,user)=>{
  if (
    !body.name || body.name.length < i+i ||
    !body.ingredients || body.ingredients.length < i ||
    !body.preparation || body.preparation.length < i 
  ){
    return {message:'Invalid entries. Try again.'};
  }else {
    const recipeAdded = await addrecipie(body,user._id);
    return recipeAdded;
  };

};
const getAllrecipies = async()=>{
  return await getall();
};


const getOneRecipe = async(_id)=>{
  if(!ObjectId.isValid(_id)){
    return notfound;
  };
  
  const res = await getone(_id);
  if(!res){ return notfound;} return res;
  
};


module.exports ={
  
  validarecipies,
  getAllrecipies,
  getOneRecipe,

};