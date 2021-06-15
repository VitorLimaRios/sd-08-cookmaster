const connect = require('./connect');

const TABLE_USERS = 'users';

const addUser = async (data) => {
  const { name, email, password } = data;

  const add = await connect()
    .then((db) => db.collection(TABLE_USERS)
      .insertOne({ name, email, password, role: 'user' }))
    .catch((_err) => console.log('Ops, não salvei'));
  return add;
};

module.exports = {
  addUser,
};
