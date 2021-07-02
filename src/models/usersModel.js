const connection = require('./connection');

const createUser = async (objDataForCreate) => {
  const db = await connection();
  const { ops} = await db.collection('users').insertOne(objDataForCreate);
  const {password:_, ...others} = ops[0];
  return others;
};

const getByEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({email});
  return result;
};

module.exports ={
  createUser,
  getByEmail,
};
