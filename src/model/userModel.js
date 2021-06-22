const { ObjectId } = require('mongodb');
const connect = require('./connect');

const TABLE_USERS = 'users';

const addUser = async (data) => {
  const { name, email, password } = data;

  await connect()
    .then((db) => db.collection(TABLE_USERS)
      .insertOne({ name, email, password, role: 'user' }))
    .catch((_err) => console.log('Ops, não salvei'));
};

const getOneUser = async (email) => {
  const find = await connect()
    .then((db) => db.collection(TABLE_USERS)
      .findOne({ email }))
    .catch((_err) => console.log('Não foi possível encontar'));
  return find;
};

const getUserId = async (id) => {
  const find = await connect()
    .then((db) => db.collection(TABLE_USERS)
      .findOne({ _id: ObjectId(id) }))
    .catch((_err) => console.log('Não foi possível encontar'));
  return find;
};

module.exports = {
  addUser,
  getOneUser,
  getUserId,
};
