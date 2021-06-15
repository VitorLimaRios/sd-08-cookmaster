const connection = require('./connection');

const create = async (name, email, password) =>{
  const db = await connection();
  const createUser = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });
  return { name, email, password, role: 'user' };
};

const findEmail= async (email) => {
  const db = await connection();
  const isFound = await db.collection('users').findOne({email});
  return isFound;
};

const findPassword= async (password) => {
  const db = await connection();
  const isFound = await db.collection('users').findOne({password});
  return isFound;
};



module.exports = {
  create,
  findEmail,
  findPassword,
};