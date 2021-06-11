const connection = require('./connection');

const COLLECTION_NAME = 'users';

const readUsers = async() => 
  connection().then((db => db.collection(COLLECTION_NAME).find().toArray()));

const createUser = async(newUser) =>
  connection().then((db) => db.collection(COLLECTION_NAME)
    .insertOne({...newUser, role:'user'}));

module.exports = {
  readUsers,
  createUser,
};