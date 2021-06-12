const connection = require('./connection');

const create = async (name, email, password) =>{
  const db = await connection();
  await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });
  
  return { name, email, password, role: 'user' };
};

const findByEmail = async (email) => {
  const db = await connection();
  const isFound = await db.collection('users').findOne({email});

  return isFound;
};



module.exports = {
  create,
  findByEmail,
};