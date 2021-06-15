const connection = require('./connection');

const getAllUsers = async () => {
  const db = await connection();
  const getUser = await db.collection('users').find().toArray();
  return getUser;
};

const createUser = async (name, email, password) => {
  const db = await connection();
  const addUser = await db.collection('users').insertOne({
    name, email, password, role: 'user'
  });
  return addUser;
};

module.exports = {
  getAllUsers,
  createUser,
};
