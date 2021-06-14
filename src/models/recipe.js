const { connection } = require('./connection');
const saveMe = require('../utils/saveMe');
const { ObjectId } = require('mongodb');

const create = saveMe(async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();

  const { insertedId } = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId
  });
  
  return {
    _id: insertedId,
    name,
    ingredients,
    preparation,
    userId
  };
});

const getAll = saveMe(async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
});

const getById = saveMe(async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  return db.collection('recipes').findOne(ObjectId(id));
});

const edit = saveMe(async (id, { name, ingredients, preparation, userId }) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const { modifiedCount } = await db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation, userId } }
  );

  if (!modifiedCount) return null;

  return { _id: id, name, ingredients, preparation, userId };
});

module.exports = {
  create,
  getAll,
  getById,
  edit
};
