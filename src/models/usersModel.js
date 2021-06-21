const connect = require('./mongoConnection');

const COLLECTION = 'users';

const createUser = async (user) => {
  return connect().then((db) => db.collection(COLLECTION).insertOne(user))
    .then((result) => result.ops[0]);
};

const getUser = async (email) => {
  return connect().then((db) => db.collection(COLLECTION).findOne({ email }));
};

module.exports = {
  createUser,
  getUser,
};