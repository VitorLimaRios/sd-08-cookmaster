const connection = require('./connection');

const createUser = async (name, email, password) => {
  const db = await connection();
  // console.log('create', email, password, name);
  const result = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });
  return result.ops[0];
};
  // console.log('create:', result);
  // return result;

const findUser = async (email) => {
  try {
    const db = await connection();
    const result = await db.collection('users').findOne({ email });
    // console.log('model findUser:', result);
    return result;
  } catch (err) {
    console.log(err);
  }
  // console.log('email no findUser:', data);
};

module.exports = {
  createUser,
  findUser,
};
