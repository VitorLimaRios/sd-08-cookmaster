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
  const data = await connection()
    .then((db) => db.collection('users').findOne({email: email}));
  if(!data || data.password !== password) return null;
  return data;
}

module.exports = {
  createUser, checkLogin
};