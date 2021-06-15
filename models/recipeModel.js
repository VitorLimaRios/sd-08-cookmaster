const getCollections = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => 
  getCollections('recipes').then(db => db.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollections('recipes').then((recipe) => recipe.findOne(ObjectId(id)));
};

const create = async (recipe, authorization) => {
  const result = await getCollections('recipes').then(db => 
    db.insertOne(recipe)
  ); 
  return { _id: result.insertdId, recipe };
};  

module.exports = {
  getAll,
  getById,
  create,
};  

