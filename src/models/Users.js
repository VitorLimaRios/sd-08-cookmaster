const connection = require('./connection');

const create = async (user, role = 'user') => {
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne({...user, role}));
  
  delete user.password;

  return { user: {...user, role, _id: insertedId }};
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
