const { connection } = require('./connection');
const saveMe = require('../utils/saveMe');

const create = saveMe(async ({ name, email, password, role = 'user'}) => {
  const db = await connection();

  const { insertedId } = await db.collection('users')
    .insertOne({ name, email, password, role });

  return { _id: insertedId, name, email, password, role };
});

const getByEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  return result;
};

module.exports = {
  create,
  getByEmail
};
