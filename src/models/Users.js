const connection = require('./connection');

const createUser = async (user) => {
  const db = await connection();
  user.role = 'user';
  const result = await db.collection('users').insertOne(user);
  delete user.password;
  return {
    user: {
      ...user,
      _id: result.insertedId,
    },
  };
};

const isEmailRegistered = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email: email });
  return Boolean(result);
};

const login = async (user) => {
  const db = await connection();
  const result = await db
    .collection('users')
    .findOne({ email: user.email, password: user.password });
  return result;
};

module.exports = {
  createUser,
  isEmailRegistered,
  login,
};
