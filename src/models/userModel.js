const connection = require('../models/connection');

async function createUser(name, password, email){
  const checkUserEmail = await connection()
    .then((db) => db.collection('users').findOne({email: email}));
  if(checkUserEmail) return null;
  const data = await connection().then((db) => 
    db.collection('users').insertOne({
      name, email, role: 'user', password}));
  return data.ops[0];
}

module.exports = {
  createUser
};