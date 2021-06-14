const connection = require('./connection');
const role =  'users';
const create = async (name, email, password)  =>
  connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }))
    .then(result => result.ops[0]);

// const createAdmin = (name, email, password) =>
//   connection()
//     .then((db) => db.collection('users').insertOne({
//       name,
//       email,
//       password,
//       role: 'admin',
//     }))
//     .then((result) => ({
//       _id: result.insertedId,
//       name,
//       email,
//       password,
//       role: 'admin',
//     }));

const findByEmail = async (email) => {
  const foundUser = await  connection()
    .then((db) => db.collection('users').findOne({ email }));
  return foundUser;
};

const login = async (email, password) => {
  const foundUser = connection()
    .then((db) => db.collection('users').findOne({ email, password }));
  return foundUser;
};

module.exports = {
  create,
  findByEmail,
  login,
  // createAdmin,
};
