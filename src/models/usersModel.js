const connect = require('./connection');

const addUser = async ({ name, email, password, role = 'user'}) => {
  const response = await connect().
    then((db) => db.collection('users').insertOne({ name, email, password, role }));
  
  return response.ops[0];
};

const findSingleEmail = async (email) => {
  const response = await connect().
    then((db) => db.collection('users').findOne({ email: email }));

  return response;
};

module.exports = {
  addUser,
  findSingleEmail,
};
