const connection = require('./connection');

const checkUserInBank = async (email, password) => {
  const response = await connection().then((db) => db.collection('users')
    .find({email: email, password: password}).toArray());
  return response;
};

module.exports = {
  checkUserInBank,
};
