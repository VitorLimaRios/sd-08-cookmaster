const connection = require('./connection');

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
    name,
    email,
    role: 'user'
  };
};

const getAll = async () => {
  const db = await connection();
  const usersCollection = db.collection('users');
  const users = await usersCollection.find().toArray();
  return users;
};

const findByEmail = async (email) => {
  const db = await connection();
  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({ email });
  return user;
};

module.exports = {
  create,
  getAll,
  findByEmail,
};
