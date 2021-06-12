const connection = require('./connection');

const USER_COLLECTION = 'users';

const getEmail = async (email) => {
  const db = await connection();
  const findEmail = await db.collection(USER_COLLECTION).findOne({ email });
  return findEmail;
};

const create = async (newUser) => {
  const findEmail = await getEmail(newUser.email);
  if (findEmail) return null;
  const user = { ...newUser, role: 'user' };
  const conn = await connection();
  const { insertedId: _id } = await conn.collection(USER_COLLECTION).insertOne(user);
  const { name, email, role } = user;
  return { user: { _id, name, email, role } };
};

module.exports = {
  getEmail,
  create,
};
