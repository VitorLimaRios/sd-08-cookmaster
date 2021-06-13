const getCollections = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => 
  getCollections('recipes').then(db => db.find().toArray());

const create = async (recipe, authorization) => {
  const result = await getCollections('recipes').then(db => 
    db.insertOne(recipe)
  ); 
  return { _id: result.insertdId, recipe };
};  

module.exports = {
  getAll,
  create,
};  

