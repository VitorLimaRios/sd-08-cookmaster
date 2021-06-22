const { ObjectId } = require('mongodb');
const connection = require('./connection');

const DeleteRecipe = async ({ id }) => {
  const db = await connection();

  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = DeleteRecipe;