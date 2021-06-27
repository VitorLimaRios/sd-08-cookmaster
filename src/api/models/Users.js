const connection = require('./connection');
const { ObjectId } = require('mongodb');

const newUser = async (user) => connection()
  .then((db) => db.collection('users').insertOne(user));

const findUser = async ({ email }) => connection()
  .then((db) => db.collection('users').findOne({ email }));

const findUserById = async (id) => connection()
  .then((db) => db.collection('users').findOne(ObjectId(id)));


module.exports = {
  newUser,
  findUser,
  findUserById
};