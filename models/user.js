const connection = require('./mongoConnection');

const getAll = async () => connection()
  .then(db => db.collection('users').find().toArray())
  .then((users) => ({ users }));

const add = async (name, email, password, role = 'user') => connection()
  .then((db) => db.collection('users').insertOne({name, email, password}))
  .then((result) => ({ user: { _id: result.insertedId, name, email, role}}));

const getByEmail = async (email) => {

  const userEmail = await connection()  
    .then(db => db.collection('users').findOne({email}));

  !userEmail && null;

  return userEmail;
};

module.exports = {
  getAll,
  add,
  getByEmail,
};