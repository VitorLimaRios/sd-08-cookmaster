const connect = require('./connection');

const getAll = async () =>
  connect().then((db) => db.collection('users').find().toArray());  

module.exports = {
  getAll,
};
