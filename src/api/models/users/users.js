const Connection = require('../connection');
const { ObjectId } = require('mongodb');

const getAllModel = async () => {
  const db = await Connection();
  return await db.collection('users').find({}).toArray();
};

const addModel = async (users) => {
  const { name, email } = users;
  const db = await Connection();
  const result = await db.collection('users')
    .insertOne({ user: { name, email, role: 'user' } });
  return result.ops[0];
};

const getByEmail = async (user) => {
  console.log('linha 18', user.email);
  const db = await Connection();
  const result = await db.collection('users').findOne({ 'user.email': user.email });
  return result;
};

// const getById = async (ids) => {
//   if (!ObjectId.isValid(ids)) return null;
//   const db = await Connection();
//   const result = await db.collection('users').findOne({_id: ObjectId(ids) });
//   return result;
// };

// const updateById = async (ids, produto) => {
//   const db = await Connection();
//   await db.collection('users')
//     .updateOne({ _id: ObjectId(ids) }, { $set: produto });
//   const result = await getById(ids);
//   return result;
// };

// const deleteById = async (ids) => {
//   const result = await getById(ids);
//   const db = await Connection();
//   await db.collection('users')
//     .deleteOne({ _id: ObjectId(ids) });
//   return result;
// };

module.exports = {
  getAllModel,
  addModel,
  getByEmail,
  // getById,
  // updateById,
  // deleteById,
};
