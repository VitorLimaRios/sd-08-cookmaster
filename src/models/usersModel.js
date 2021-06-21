const conn = require('./modelConnection');
// const { ObjectID, ObjectId } = require('mongodb');

const table = 'users';

const create = async (user) => conn()
  .then((db) => db.collection(table).insertOne(user))
  .then((res) => res.ops[0]);

// const readById = async (table, id) => conn()
//   .then((db) => ObjectId.isValid(id) 
//     ? db.collection(table).findOne({ _id: ObjectID(id) })
//     : null
//   );

const readByEmail = async (email) => conn()
  .then((db) => db.collection(table).findOne({ email }));

module.exports = {
  create,
  readByEmail,
};
