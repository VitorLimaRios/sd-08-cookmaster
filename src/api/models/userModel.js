const {ObjectId} = require('mongodb');
const connect = require('./connection');

const addUser = async(name, email, password) =>
  connect().then(async(db) => {
    const result = await db.collection('users').insertOne({name, email, password});
    return result.ops[0];
  });

module.exports = {addUser};
