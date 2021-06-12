// Models é a conexão com o banco de dados em 'estado bruto', para ser filtrado em services, ou, se desnecessário, pode ir direto para o controller

const connection = require('./connection');

const firstUser = {
  "name": "Erick Jacquin",
  "email": "erickjacquin@gmail.com",
  "password": "12345678",
  "role": "user"
};
const getAllTheUsers = async () => {
  const gotAllUsers = await connection()
    .then((db => db.collection('users').find().toArray()))
    .then(allUsers => allUsers)
  return gotAllUsers
};

const findUserByName = async (name) => {
  const findingUser = await connection()
    .then((db => db.collection('users').findOne({ 'name': name })));
  // ou seria melhor fazer um filtro? // const finding = allTheUsers.find(users => users.name === name)
  return findingUser
};

const createNewUser = async (user) => {
  const insertWithRole = { ...user, 'role': 'user' }
  const inserting = await connection().then((db => db.collection('users').insertOne(insertWithRole)));
  return { _id: inserting.insertedId, ...insertWithRole }
};

const deleteUserByName = async (userName) => {
  return connection().then(db => db.collection('users').deleteOne({ 'name': userName }))
}


module.exports = { getAllTheUsers, findUserByName, createNewUser, deleteUserByName };
