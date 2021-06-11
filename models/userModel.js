const getCollections = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => 
  getCollections('users').then(db => db.find().toArray());

const create = async (user) => {
  const result = await getCollections('users').then(db => 
    db.insertOne(user)
  ); 
  return { _id: result.insertdId, user };
};  

module.exports = {
  getAll,
  create,
};  

