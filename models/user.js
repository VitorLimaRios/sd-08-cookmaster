const connection = require('./mongoConnection');
const { ObjectId, ObjectID } = require('mongodb');

const getAll = async () => connection()
  .then(db => db.collection('users').find().toArray())
  .then((users) => ({ users }));

const add = async (name, email, password, role = 'user') => connection()
  .then((db) => db.collection('users').insertOne({name, email, password}))
  .then((result) => ({ user: { _id: result.insertedId, name, email, role}}));

const getByEmail = async (email) => {

  const userEmail = await connection()  
    .then(db => db.collection('users').findOne({email}));

  !userEmail && null;

  return userEmail;
};
// const getById = async (id) => {
//   if (!ObjectId.isValid(id)) return null;

//   const productId = await connection()
//     .then((db) => db.collection('products').findOne({ _id: ObjectID(id)}));

//   !productId && null;

//   return productId;
// };

// const update = async ( id, name, quantity ) => {
//   if (!ObjectId.isValid(id)) return null;

//   const product = await connection()
//     .then(
//       (db) =>	db
//         .collection('products')
//         .updateOne({_id: ObjectId(id) }, { $set: { name, quantity }
//         })
//         .then((result) => ({ _id: result.insertedId, name, quantity }))
//     );

//   !product && null;

//   return product;
// };

// const deleteProduct = async (id) => await connection()
//   .then(db => db.collection('products').deleteOne({_id: ObjectId (id)}));

module.exports = {
  getAll,
  add,
  getByEmail,
  // getById,
  // update,
  // deleteProduct,
};