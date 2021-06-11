const connection = require('connection');

const create = async (name, email, password) => {
  const db = await connection();
  const usersCollection = db.collection('users');

  const newUser = {
    name,
    email,
    password,
    role: 'user'
  };

  const { insertedId } = await usersCollection.insertOne(newUser);

  return {
    _id: insertedId,
    ...newUser
  };
};

const getAll = async () => {
  const db = await connection();
  const usersCollection = db.collection('users');
  const users = await usersCollection.find().toArray();
  return users;
};

module.exports = {
  create,
};
