
const connection = require('./connection');

const createUser = async ({ name, email, password }) => {
  try {
    const db = await connection();
    const response = await db.collection('users')
      .insertOne({ name, email, password, role: 'user' });
    return response.ops[0];
  } catch (error) {
    return { error: error.message };
  }
};

const getUser = async (data) => {
  try {
    const db = await connection();
    const response = await db.collection('users').findOne({ email: data });
    return response;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  createUser,
  getUser
};
