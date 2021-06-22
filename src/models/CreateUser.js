const connection = require('./connection');

const CreateUser = async (user) => {
  const db = await connection();

  const newUser = await db
    .collection('users')
    .insertOne(user);
  
  return newUser.ops[0];
};

module.exports = CreateUser;