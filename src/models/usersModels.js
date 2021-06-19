const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (data) => {
  const { name, email, password, role } = data;
  const inserted = await connection().then(db => 
    db.collection('users').insertOne({ name, email, password, role }));
  return { _id: inserted.insertedId, name, email, password, role };
};

const find = async (field, data) => {
  let value = data;
  if( field === '_id'){
    value = ObjectId(data);
  }
  const result = await connection().then(db => 
    db.collection('users').findOne({ [field]: value }));
  return result;
};

module.exports = { 
  create,
  find,
};