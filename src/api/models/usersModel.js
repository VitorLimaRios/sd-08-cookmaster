const connection = require('./connection');
const COLLECTION = 'users';

const insertOneUser = async (userData) => {
  const db = await connection();
  return db.collection(COLLECTION).insertOne(userData);
};

const findUserByEmail = async (email) => {
  const db = await connection();
  return db.collection(COLLECTION).findOne({ email });
};

module.exports = {
  insertOneUser,
  findUserByEmail,
};
