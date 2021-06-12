const connection = require('../models/connection');

async function createUser(name, password, email){
  const checkUserEmail = await connection()
    .then((db) => db.collection('users').findOne({email: email}));
  if(checkUserEmail) return null;
  const data = await connection().then((db) => 
    db.collection('users').insertOne({
      name, email, role: 'user', password}));
  return {user: {
    name,
    email,
    role: 'user',
    _id: data._id
  }};
}

async function checkLogin(email, password){
  const checkLogin = await connection()
    .then((db) => db.collection('users').findOne({email: email}));
  if(!checkLogin || checkLogin.password !== password) return null;
  return checkLogin;
}

module.exports = {
  createUser, checkLogin
};