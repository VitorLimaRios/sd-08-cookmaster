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

const edit = saveMe(async (id, {
  name,
  ingredients,
  preparation,
  userId,
  image = ''
}) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const { modifiedCount } = await db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation, userId, image } }
  );

  if (!modifiedCount) return null;

  return { _id: id, name, ingredients, preparation, userId, image };
});

const remove = saveMe(async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const { deletedCount } = await db.collection('recipes').deleteOne({ _id: id });
  if (!deletedCount) return null;
  return recipe;
});

module.exports = {
  create,
  getAll,
  getById,
  edit,
  remove
};
