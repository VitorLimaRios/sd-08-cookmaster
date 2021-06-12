// Models é a conexão com o banco de dados em 'estado bruto', para ser filtrado em services, ou, se desnecessário, pode ir direto para o controller

const connection = require('./connection');

const firstUser = {
  "name": "Erick Jacquin",
  "email": "erickjacquin@gmail.com",
  "password": "12345678",
  "role": "user"
};
const getAllTheUsers = async () => await connection()
  .then((db => db.collection('users').find().toArray()))
  .then(allUsers => allUsers);

const findUserByName = async (name) => await connection()
  .then((db => db.collection('users').findOne({ 'name': name })));
// ou seria melhor fazer um filtro? // const finding = allTheUsers.find(users => users.name === name)

const createNewUser = async (user) => connection().then((db => db.collection('users').insertOne({ ...user, 'role': 'user' })));

const deleteUser = async (userName) => connection().then(db => db.collection('users').deleteOne({ 'name': userName }))


module.exports = { getAllTheUsers, findUserByName, createNewUser, deleteUser };
