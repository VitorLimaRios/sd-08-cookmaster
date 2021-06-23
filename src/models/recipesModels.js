const connect = require('../configdatabase/conn');

const createRecipes = async (name, ingredients, preparation, id) => {
  const database = connect()
    .then((db) => db.collection('recipes').insertOne({
      name, ingredients, preparation, userId: id
    })).then((result) => result.ops[0]);
  return database;
};

module.exports = {
  createRecipes,
};