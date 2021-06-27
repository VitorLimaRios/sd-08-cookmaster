const connection = require('./connection');

const createUsers = async (newUser, role = 'user') => {
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne({ ...newUser, role }));
  return { user: { name:newUser.name,email:newUser.email , role, _id: insertedId } };
};

const findByEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  if (!user) {
    return null;};
  return user;
};

module.exports = {
  createUsers,
  findByEmail
};