const connection = require('../models/connection');

async function createUser(name, password, email){
  const checkUserEmail = await connection()
    .then((db) => db.collection('users').findOne({email: email}));
  if(checkUserEmail) return null;
  const data = await connection().then((db) => 
    db.collection('users').insertOne({
      name, email, role: 'user'}));
  return {user: data.ops[0]};
}

async function checkLogin(email){
  const checkLogin = await connection()
    .then((db) => db.collection('users').findOne({email: email}));
  if(!checkLogin) return null;
  return checkLogin;
}

module.exports = {
  createUser, checkLogin
};