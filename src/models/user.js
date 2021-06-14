const { connection } = require('./connection');
const saveMe = require('../utils/saveMe');

const serialize = ({ _id, name, email, password, role }) => ({
  id: _id,
  name,
  email,
  password,
  role
});

const create = saveMe(async ({ name, email, password, role = 'user'}) => {
  const db = await connection();

  const { insertedId } = await db.collection('users')
    .insertOne({ name, email, password, role });

  return { id: insertedId, name, email, password, role };
});

const getByEmail = saveMe(async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  if (!result) return null;
  return serialize(result);
});

module.exports = {
  create,
  getByEmail
};
