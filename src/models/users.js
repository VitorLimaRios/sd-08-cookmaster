const connection = require('./connection');

const getDbCollection = async () => connection()
  .then((db) => db.collection('users'));

const findEmail = async (email) => getDbCollection()
  .then((collection) => collection.findOne({ email }));

const addUser = async (name, email, password, role = 'user') => getDbCollection()
  .then((collection) => collection.insertOne({ name, email, password, role }));


module.exports = {
  addUser,  
  findEmail,
};