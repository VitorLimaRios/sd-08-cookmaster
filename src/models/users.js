const connection = require('./connection');

const COLLECTION_NAME = 'users';

const readUsers = async() => 
  connection().then((db) => db.collection(COLLECTION_NAME).find().toArray());

const readByKey = async (key, value) => 
  connection().then((db) => db.collection(COLLECTION_NAME)
    .findOne({
      [key] : value
    })
  );

const createUser = async(newUser) =>
  connection().then((db) => db.collection(COLLECTION_NAME)
    .insertOne({...newUser, role:'user'}));

module.exports = {
  readUsers,
  readByKey,
  createUser,
};