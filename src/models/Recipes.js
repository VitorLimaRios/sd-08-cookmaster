const connection = require('./connection');

const create = async (recipe) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ recipe }));

  return { recipe: { ...recipe, _id: insertedId } };
};

module.exports = {
  create
};