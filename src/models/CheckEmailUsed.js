const connection = require('./connection');

const CheckEmailUsed = async (email) => {
  const db = await connection();

  const existingEmail = await db.collection('users').findOne({email});
  
  return Boolean(existingEmail);
};

module.exports = CheckEmailUsed;