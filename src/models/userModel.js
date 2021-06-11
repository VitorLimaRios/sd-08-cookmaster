const connection = require('./connection');

const USERS = 'users';

const createUser = async ({ name, email, password }) => {
  try {
    const db = await connection();
    const result = await db.collection(USERS)
      .insertOne({ name, email, password, role: 'user' });
    return result.ops[0];
  } catch (error) {
    return { error: error.message };
  }
};

const findUser = async (data) => {
  try {
    const db = await connection();
    const result = await db.collection(USERS).findOne({ email: data });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  createUser,
  findUser,
};
