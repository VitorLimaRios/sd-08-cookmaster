const connection = require('./connection');

// Criar usuário
const createUser = async (name, email, password, role) => {
  const newUser = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));

  return {
    _id: newUser.insertedId,
    name,
    email,
    password,
    role,
  };
};

// Procurar um usuário pelo email
const findByEmailUser = async (email) => {
  const userByEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  
  return userByEmail;
};

// Listar todos os usuários
const getAllUsers = async () => {
  const allUsers = await connection()
    .then((db) => db.collection('users').find().toArray());
  
  return allUsers;
};

module.exports = {
  createUser,
  findByEmailUser,
  getAllUsers,
};
