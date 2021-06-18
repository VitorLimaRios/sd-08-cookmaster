const connection = require('./mongoConnection');

const add = async (name, email, password, role = 'user') => connection()
  .then((db) => db.collection('users').insertOne({name, email, password}))
  .then((result) => ({ user: { _id: result.insertedId, name, email, role}}));

const createRecipe = async (name, ingredients, preparation, userId) => connection()
  .then(
    (db) => db.collection('recipes').insertOne({name, ingredients, preparation, userId}))
  .then(
    (result) => ({ recipe: {
      _id: result.insertedId, 
      name, 
      ingredients, 
      preparation, 
      userId
    }
    })
  );

module.exports = { 
  createRecipe,
};