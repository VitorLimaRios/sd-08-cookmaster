const connection = require('./connection');
/* const { ObjectId } = require('mongodb'); */

const createRecipe = async (objDataForCreate) => {
  const db = await connection();
  const { ops} = await db.collection('recipes').insertOne(objDataForCreate);
  return ops[0];
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

// getAll().then(console.log);

module.exports = {
  createRecipe,
  getAll,
};
