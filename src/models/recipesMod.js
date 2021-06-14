const connect = require('./connection');

const addRecipes = (name, ingredients, preparation, userId) => 
  connect().then( async (db) => {
    const postRecipes = await db.collection('recipes')
      .insertOne({name, ingredients, preparation, userId});

    return postRecipes.ops[0];
  });

const getAllRecipes = async () =>
  connect().then((db) => db.collection('recipes').find().toArray());  

module.exports = {
  addRecipes,
  getAllRecipes,
};