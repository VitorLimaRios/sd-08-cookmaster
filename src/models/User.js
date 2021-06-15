const connection = require('./connection');
// const { ObjectId } = require('mongodb');

// const getAllUsers = async () => connection()
//   .then((db) => db
//     .collection('users')
//     .find()
//     .toArray());

// const getUserById = async (id) => {
//   if (!ObjectId.isValid(id)) return null;

//   return connection()
//     .then((db) => db
//       .collection('users')
//       .findOne(ObjectId(id)));
// };

const createUser = async (name, email, password) => connection()
  .then(async (db) => {
    const newUser = await db
      .collection('users')
      .insertOne({
        name,
        email,
        password,
        role: 'user'
      });
    return newUser.ops[0];
  });

// const updateUser = async (id, name, quantity) =>
//   connection()
//     .then(async (db) => {
//       const user = await db
//         .collection('users')
//         .updateOne({ _id: ObjectId(id) }, { $set: { name, email, password, role } });

//       return { _id: id, name, email, password, role };
//     });

// const deleteUser = async (id) =>
//   connection()
//     .then(async (db) => db
//       .collection('users')
//       .deleteOne({ _id: ObjectId(id) })
//     );

const findEmail = async (email) => {
  try {
    const emailRegistered = connection()
      .then((db) => db
        .collection('users')
        .findOne({ email }));
    return emailRegistered;
  } catch (err) {
    console.log('Email already registered');
  }
};

module.exports = {
  createUser,
  findEmail,
  // getAllUsers,
  // getUserById,
  // updateUser,
  // deleteUser
};
