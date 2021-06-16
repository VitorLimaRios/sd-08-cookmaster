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

module.exports = {
  addNew,
  getByKeysValues,
  getAll,
  getById,
};
