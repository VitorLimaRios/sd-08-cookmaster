const connection = require('./connection');

const getAll = async () => {
  try {
    const db = await connection();
    const users = await db.collection('users').find().toArray();
    const result = { users: [...users] };
    return result;
  } catch (error) {
    return error;
  }
};

const createUser = async (name, email, password) => {
  try {
    const db = await connection();
    const result = await db.collection('users')
      .insertOne({ name, email, password, role: 'user' });
    return result.ops[0];
  } catch (error) {
    return error;
  }
};

const findEmail = async (email) => {
  const db = await connection();
  const userEmail = await db.collection('users').findOne({ email });
  return userEmail;
};

module.exports = {
  getAll,
  createUser,
  findEmail,
};
