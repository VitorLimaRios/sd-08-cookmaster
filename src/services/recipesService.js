const { addrecipie } = require('../models/recipesModel');

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
const getAll = async()=>{};



module.exports ={
  
  validarecipies,
  getAll,

};