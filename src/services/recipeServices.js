const recipesModel = require('../models/recipeModel');

const CREATED = 201;
const BAD_REQUEST = 400;
const OK = 200;
const NO_CONTENT = 204;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;


const createRecipes = async (recipes) => {
  console.log(recipes);
  const { name, ingredients, preparation, _id } = recipes;

  if(!name || !ingredients || !preparation)
    return { status: BAD_REQUEST, message: { message: 'Invalid entries. Try again.' } };

  const result = await recipesModel
    .createRecipes({ name, ingredients, preparation, _id });

  return {
    status: CREATED,
    message: {
      recipe: {
        name: result.name,
        ingredients: result.ingredients,
        preparation: result.preparation,
        userId: result.userId,
        _id: result._id,
      }
    }
  };
};
const getAll = async()=>{
  const result = await recipesModel.getAll();
  return result;
};

const getOne = async(id)=>{
  const result = await recipesModel.getOne(id);
  if(!result || result === null) 
    return { status: NOT_FOUND, message: { message: 'recipe not found' } };
  return ({
    status:OK,
    message:result
  });
};

const update = async(id,recipes,user)=>{
  const recipe = await getOne(id);
  const {userId} = recipe.message;
  if ((userId.toString() !== user._id.toString()) && user.role === 'user')
    return { status: UNAUTHORIZED, message: { message: 'user not authorized' } };

  const updated = await recipesModel.update(id,recipes);
  console.log(updated);
  return {
    status: OK,
    message: {
      _id: id,
      name: recipes.name,
      ingredients: recipes.ingredients,
      preparation: recipes.preparation,
      userId: userId,
    },
  };
};

const deleteOne = async(id,user) =>{
  const recipe = await getOne(id);
  const {userId} = recipe.message;
  if ((userId.toString() !== user._id.toString()) && user.role === 'user')
    return { status: UNAUTHORIZED, message: { message: 'user not authorized' } };
  await recipesModel.deleteOne(id);
  return {status:NO_CONTENT,message:''};
};

const addImage = async (recipeId, file,user) => {
  const recipe = await getOne(recipeId);
  const {userId} = recipe.message;
  if ((userId.toString() !== user._id.toString()) && user.role === 'user')
    return { status: UNAUTHORIZED, message: { message: 'user not authorized' } };
  const image = 'localhost:3000/' + file.destination + file.filename;
  recipesModel.addImage(recipeId, image);
  const result = await recipesModel.getOne(recipeId);
  return { status: OK, message: result };
};

module.exports = {
  createRecipes,getAll,getOne,update,deleteOne,addImage
};