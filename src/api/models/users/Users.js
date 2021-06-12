const { COLLECTION_USERS } = require('../../utils/consts');
const connectionDB = require('../../connections/ConnectionDB');

const create = async (name, email, password) => {
  return connectionDB()
    .then((db) => db.collection(COLLECTION_USERS)
      .insertOne({ name, email, password, role: 'user' }))
    .then((result => result.ops[0]));
};

const getByEmail = async (email) => {
  return connectionDB()
    .then((db) => db.collection(COLLECTION_USERS)
      .findOne({ email: email }))
    .then((result => result));
};

module.exports = {
  create,
  getByEmail,
};
