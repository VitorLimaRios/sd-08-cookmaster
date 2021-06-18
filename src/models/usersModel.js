// Models é a conexão com o banco de dados em 'estado bruto', para ser filtrado em services, ou, se desnecessário, pode ir direto para o controller
const connection = require('./connection');


// const firstUser = {
//   "name": "Erick Jacquin",
//   "email": "erickjacquin@gmail.com",
//   "password": "12345678",
//   "role": "user"
// };

const getAllTheUsers = async () => {
  const gotAllUsers = await connection()
    .then((db => db.collection('users').find().toArray()));
  return gotAllUsers;
};

const findUserByName = async (name) => {
  const findingUserName = await connection()
    .then((db => db.collection('users').findOne({ name })));
  return findingUserName;
};

const findUserByEmail = async (email) => {
  const findingUserName = await connection()
    .then((db => db.collection('users').findOne({ email })));
  return findingUserName;
};

const createNewUser = async ({ name, email, password }) => {
  const userInformation = { name, email, password, role: 'user' };
  const inserting = await connection()
    .then((db => db.collection('users').insertOne(userInformation)));
  return {
    user: {
      name, email, role: userInformation.role, _id: inserting.insertedId,
    }
  };
};

const deleteUserByName = async (userName) => {
  return connection().then(db => db.collection('users').deleteOne({ 'name': userName }));
};


module.exports = {
  getAllTheUsers, findUserByName, findUserByEmail, createNewUser, deleteUserByName
};
