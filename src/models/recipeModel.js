const { ObjectId } = require('mongodb');
const connection = require('../models/connection');

async function createRecipe(name, ingredients, preparation, userId){
  const data = await connection().then((db) => db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId
  }));
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: data.insertedId
    }
  };
}

async function getAllRecipes(){
  const data = await connection().then((db) => db.collection('recipes').find().toArray());
  return data;
}

async function getRecipeById(id){
  if(!ObjectId.isValid(id)) return null;
  const data = await connection().then((db) => 
    db.collection('recipes').findOne(new ObjectId(id)));
  return data;
}

async function editRecipe(name, ingredients, preparation, id){
  await connection().then((db) => db.collection('recipes').updateOne(
    {_id: ObjectId(id)},
    {$set: {name, ingredients, preparation} }
  ));
  return getRecipeById(id);
}

const deleteRecipe = async(id) =>  await connection().then((db) => 
  db.collection('recipes').deleteOne({_id: ObjectId(id)}));

const addImage = async(id, imagePath) => {
  const recipe = await getRecipeById(id);
  await connection().then((db) => db.collection('recipes').updateOne(
    {_id: ObjectId(id)},
    {$set: {...recipe, image: imagePath}}
  ));
  return {
    ...recipe,
    image: imagePath
  };
};

module.exports = {
  createRecipe, getAllRecipes, getRecipeById, editRecipe, deleteRecipe, addImage
};