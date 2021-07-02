const rescue = require('express-rescue');
const RecipesService = require('../services/Recipes');
const verifyRecipe = require('../services/utils/RecipeSchema');

const {CREATED ,OK,NO_CONTENT}=require('../services/utils/variableStatus');

const createRecipes = rescue(async (req, res, next) =>  {
  const {_id}=req.id;

  const { error } = verifyRecipe.validate(req.body);
  if(error){
    return next(error);}

  const { name , ingredients ,preparation} = req.body;
  const new_recipe = await RecipesService.createRecipes({name ,
    ingredients ,preparation , userId:_id});
 
  return res.status(CREATED).json(new_recipe);

});

const findAll=rescue(async(req,res,next)=>{
 
  const all_recipe = await RecipesService.findAll({});
  return res.status(OK).json(all_recipe);
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const idRecipe = await RecipesService.findById(id);

  if (idRecipe.error) return next(idRecipe.error);

  return res.status(OK).json(idRecipe);
});

const updateById = rescue(async(req,res,next)=>{
 
  const editRecipe = await 
  RecipesService.updateById({...req.params,...req.body},req.tipeUser);

  return  res.status(OK).json(editRecipe);

});

const deleteRecipe =  rescue(async(req,res,next)=>{
  const { id } = req.params;
  await RecipesService.deleteRecipe(id);
  return res.status(NO_CONTENT).json();
});

const updateImage = rescue(async(req,res,next)=>{
  const {_id:userId}=req.id;
  const { id } = req.params;
  const image = `localhost:3000/src/uploads/${id}.jpeg`;
  const recipe = await RecipesService.updateImage(id,image);
  req.recipe = {...recipe,userId};
  next();

});


module.exports={
  createRecipes,
  findAll,
  findById,
  updateById,
  deleteRecipe,
  updateImage
  
};