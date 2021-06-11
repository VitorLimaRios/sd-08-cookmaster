const connection = require('./connection');

const socorro = 'users';

const createUser = async (name, email, password) => {
  const db = await connection();
  console.log('create', email, password, name);
  const result = await db.collection(socorro)
    .insertOne({ name, email, password, role: 'user' });
  return { name, email, password, role: 'user' };
};
  // console.log('create:', result);
  // return result;

const findUser = async (email) => {
  try {
    const db = await connection();
    const result = await db.collection(socorro).findOne({ email });
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
