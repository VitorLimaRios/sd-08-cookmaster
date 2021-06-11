const connection = require('./connection');
const { ObjectId } = require('mongodb');

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

const findById = async (id) => {
  const db = await connection();
  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne(new ObjectId(id));
  return user;
};


module.exports = {
  create,
  getAll,
  findByEmail,
  findById,
};
