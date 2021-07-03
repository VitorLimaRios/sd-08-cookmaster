const connection = require('./connection');

const findUserByEmail = async (email, password = null) => {
  const db = await connection();
  let user;
  if(password) {
    user = await db.collection('users').findOne({email, password});
  } else {
    user = await db.collection('users').findOne({email});
  };

  return user;
};

const create = async (name, email, password, role) => {
  const db = await connection();
  const user = await db.collection('users').insertOne({name, email, password, role});
  return user.ops[0];
};


module.exports = {
  create,
  findUserByEmail
};
