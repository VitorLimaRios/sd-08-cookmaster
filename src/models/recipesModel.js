const connect = require('./connection');

const addRecipes = (name, ingredients, preparation, userId) => 
  connect().then( async (db) => {
    const insertRecipes = await db.collection('recipes')
      .insertOne({name, ingredients, preparation, userId});

    return insertRecipes.ops[0];
  });

const getAllRecipes = async () =>
  connect().then((db) => db.collection('recipes').find().toArray());  

module.exports = {
  addRecipes,
  getAllRecipes,
};
