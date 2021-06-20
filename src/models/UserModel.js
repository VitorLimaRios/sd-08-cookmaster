const connection = require('./connection');

const create = async (name, email, password, role) => 
  connection()
    .then((db) => db.collection('users').insertOne({name, email, password, role}))
    .then((data) => {
      const [result] = data.ops;
      return result;
    });

const getAll = () => 
  connection()
    .then((db) => db.collection('users').find().toArray());

module.exports = {
  create,
  getAll
};
