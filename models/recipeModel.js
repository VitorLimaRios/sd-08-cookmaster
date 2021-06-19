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

const update = async (id, recipe, authorization) => {
  if (!ObjectId.isValid(id)) return;

  await getCollections('recipes').then((db) => 
    db.updateOne({ _id: ObjectId(id) }, 
      { $set: { ...recipe } } )
  );
  return getById(id);
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return;

  const result = await getCollections('recipes').then(db => 
    db.deleteOne({ _id: ObjectId(id) })
  );
  return { _id: result.insertedId };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};  

