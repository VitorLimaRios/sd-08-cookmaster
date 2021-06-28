const connection = require('./connection');
const COLLECTION = 'users';

const createUser = async (data) => {
  const db = await connection();
  return db.collection(COLLECTION).insertOne(data);
};

module.exports = {
  createUser,
};
