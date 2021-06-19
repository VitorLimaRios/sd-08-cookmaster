const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const insertUser = async (name, email, password) =>
  await connection()
    .then((db) => db.collection('users')
      .insertOne({ name, email, password, role: 'user' }))
    .then((result) => (
      { user: { _id: result.insertedId, name, email, role: result.ops[0].role } }));

const findByEmail = async (emailNewUser) =>
  await connection()
    .then((db) => db.collection('users').findOne({ email: emailNewUser }))
    .then(response => response)
    .catch(err => console.log(err));

// const findById = async (id) => {
//   try {
//     const db = await connection();
//     return await db.collection('users')
//       .findOne(new ObjectId(id));
//   } catch (error) {
//     return null;
//   }
// };

// const getAll = async () => {
//   try {
//     const db = await connection();
//     return await db.collection('users').find().toArray();
//   } catch (error) {
//     return null;
//   }
// };

// const updateByID = async (id, name, quantity) =>{
//   try {
//     const db = await connection();
//     return await db.collection('users')
//       .updateOne(
//         { '_id': ObjectId(id) },
//         { $set: { 'name': name, 'quantity': quantity },
//         });
//   } catch (error) {
//     return null;
//   }
// };

// const deleteByID = async (id) =>{
//   try {
//     const db = await connection();
//     return await db.collection('users')
//       .deleteOne({ '_id': ObjectId(id) });
//   } catch (error) {
//     return null;
//   }
// };

module.exports = {
  insertUser,
  findByEmail,
};
