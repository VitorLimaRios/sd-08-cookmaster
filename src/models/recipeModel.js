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
  const data = await connection().then((db) => db.collection('recipes').updateOne(
    {_id: ObjectId(id)},
    {$set: { name: name, ingredients: ingredients, preparation: preparation}
    }
  ));
  console.log(data);
  return data;
}

module.exports = {
  createRecipe, getAllRecipes, getRecipeById, editRecipe
};