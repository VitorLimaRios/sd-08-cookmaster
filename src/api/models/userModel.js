const { Db } = require('mongodb');
const connection = require('./connection');

const buscarUsuarioPorEmail = async (email) => {
  const db = await connection();
  const usuario = await db.collection('users').findOne({email: email});
  return usuario;
};

const cadastrarUsuario = async ({name, email, password}) => {
  const db = await connection();
  const { ops } = await db.collection('users')
    .insertOne({name, email, password, role: 'user'});
  return ops[0];
};

module.exports = {
  buscarUsuarioPorEmail,
  cadastrarUsuario,
};