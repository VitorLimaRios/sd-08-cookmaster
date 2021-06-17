// const { ObjectId } = require('mongodb');
const { ObjectId } = require('mongodb');
const connect = require('../connection');

const addNew = async(values, collectionName) =>  {
  const db = await connect();
  const addedDocument = await db.collection(collectionName).insertOne({...values});
  return addedDocument;
};

const getByKeysValues = async(keysValues, collectionName) => {
  const db = await connect();
  const foundDocument = await db.collection(collectionName).findOne({...keysValues});
  return foundDocument;
};

const getAll = async(collectionName) => {
  const db = await connect();
  const allDocuments = await db.collection(collectionName).find().toArray();
  return allDocuments;
};

const getById = async(id, collectionName) => {
  const db = await connect();
  const foundDocument = await db.collection(collectionName)
    .findOne({'_id': ObjectId(id)});
  return foundDocument;
};

const updateById = async(keysValues, id, collectionName) => {
  const db = await connect();
  await db.collection(collectionName).updateOne(
    {'_id': ObjectId(id)},
    { $set: {...keysValues}}
  );
  // console.log('AFTER', await getById(id, collectionName));
  // console.log(updated);
  const updated = await getById(id, collectionName);

  return updated;
};

module.exports = {
  addNew,
  getByKeysValues,
  getAll,
  getById,
  updateById,
};
