const connection = require('./connection');

const create = async (name, email, password, role) => {
  const db = await connection();
  const newUser = await db.collection('user').insertOne({ name, email, password, role });
  const result = await newUser;
 
  return await result.ops;
};

const getAll = async () => {
  const db = await connection();
  const users = await db.collection('user').find().toArray();

  return users;
};

module.exports = {
  create,
  getAll,
};
