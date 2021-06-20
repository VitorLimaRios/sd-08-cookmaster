const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const create = async (name, email) =>
  connection().then((db) =>
    db.collection('users').insertOne({ name, email, role: 'user' })
  );

const findEmail = async (email) => {
  return connection()
    .then ((db) => db.collection('users').findOne({ email: email }));
};
    
const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) =>
    db.collection('users').findOne(new ObjectId(id))
  );
};

// const del = async (id) => {
//   if (!ObjectId.isValid(id)) return null;
//   return connection()
//     .then((db) => db.collection('products') .deleteOne({ _id: ObjectId(id) }));
// };

// const getAll = async () => 
//   connection() 
//     .then ((db) => db.collection('products').find().toArray());

// const getProduct = async (id) => {
//   if (!ObjectId.isValid(id)) return null;
//   return connection()
//     .then ((db) => db.collection('products').findOne(new ObjectId(id)));
// };

// const findName = async (name) => {
//   return connection()
//     .then ((db) => db.collection('products').findOne({ name: name }));
// };

// const update = async (id, name, quantity) =>
//   connection()
//     .then((db) => db.collection('products')
//       .updateOne({_id: ObjectId(id)}, {$set: {name: name, quantity: quantity}}));

module.exports  = { create, findEmail, getById };   