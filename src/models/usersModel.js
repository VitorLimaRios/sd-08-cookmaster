// Models é a conexão com o banco de dados em 'estado bruto', para ser filtrado em services, ou, se desnecessário, pode ir direto para o controller
const connection = require('./connection');
const jwt = require('jsonwebtoken');

const firstUser = {
  "name": "Erick Jacquin",
  "email": "erickjacquin@gmail.com",
  "password": "12345678",
  "role": "user"
};

const secret = 'senha123';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const getAllTheUsers = async () => {
  const gotAllUsers = await connection()
    .then((db => db.collection('users').find().toArray()))
    .then(allUsers => allUsers)
  return gotAllUsers
};

const findUserByName = async (name) => {
  const findingUserName = await connection()
    .then((db => db.collection('users').findOne({ name })));
  // ou seria melhor fazer um filtro? // const finding = allTheUsers.find(users => users.name === name)?
  return findingUserName
};

const findUserByEmail = async (email) => {
  const findingUserName = await connection()
    .then((db => db.collection('users').findOne({ email })));
  // ou seria melhor fazer um filtro? // const finding = allTheUsers.find(users => users.email === email)?
  return findingUserName
}

const createNewUser = async (user) => {
  const insertWithRole = { ...user, 'role': 'user' }
  const { name, role, email } = insertWithRole;
  const inserting = await connection().then((db => db.collection('users').insertOne(insertWithRole)));
  return { name, email, role, _id: inserting.insertedId, }
};
const tokenGenerateForLogin = async (username, password) => {
  const token = jwt.sign({ username, password }, secret, jwtConfig);
  return ({ token })
};

const deleteUserByName = async (userName) => {
  return connection().then(db => db.collection('users').deleteOne({ 'name': userName }))
}


module.exports = { getAllTheUsers, findUserByName, findUserByEmail, createNewUser, tokenGenerateForLogin, deleteUserByName };
