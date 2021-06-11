const connection = require('./connection');
const collectionName = 'users';

const getUserByLogin = async (email, password) =>
  connection()
    .then((db) =>
      db
        .collection(collectionName)
        .findOne({ email: email, password: password })
    )
    .then((response) => response);

module.exports = {
  getUserByLogin,
};
