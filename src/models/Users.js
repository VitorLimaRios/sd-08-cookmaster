const connection = require('./connection');

const create = async (user) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne({...user}));
  
  delete user.password;

  return { user: {...user, _id: insertedId }};
};

const findByEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  
  if (!user) return null;
  
  return user;
};
  
module.exports = {
  create,
  findByEmail
};
