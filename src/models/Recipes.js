const connection = require('./connection');

const create = async (recipe, userId) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne(recipe));

  return { recipe: { ...recipe, userId, _id: insertedId } };
};

const get = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());

  return recipes;
};

module.exports = {
  create,
  get
};
