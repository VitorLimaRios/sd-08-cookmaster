const connect = require('./connection');

const addUser = (name, email, password, role) => 
  connect().then( async (db) => {
    const postUser = await db.collection('users')
      .insertOne({name, email, password, role});

    return postUser.ops[0];
  });

const getAll = async () =>
  connect().then((db) => db.collection('users').find().toArray());

const findUser = async (userId) =>
  connect().then((db) => db.collection('users').findOne({ userId }));

module.exports = {
  addUser,
  getAll,
  findUser,
};