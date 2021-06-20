const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getDbCollection = async () => connection()
  .then((db) => db.collection('recipes'));

const createRecipe = async (name, ingredients, preparation) => getDbCollection()
  .then((collection) => collection.insertOne({ name, ingredients, preparation }));

module.exports = {
  createRecipe,   
};