const connect = require('./connection');
const {ObjectId} = require('mongodb');

const addRecipe = async(userId, name, ingredients, preparation) =>
  connect().then(async(db) => {
    const result = await db.collection('recipes')
      .insertOne({userId, name, ingredients, preparation});
    return result.ops[0];
  });

const getAllRecipe = async() =>
  connect().then(async(db) => {
    const result = await db.collection('recipes').find().toArray();
    return result;
  });

const getByIdRecipe = async(id) =>
  connect().then(async(db) => {
    if (!ObjectId.isValid(id)) return null;
    const result = await db.collection('recipes').findOne(ObjectId(id));
    return result;
  });

module.exports = {addRecipe, getAllRecipe, getByIdRecipe};