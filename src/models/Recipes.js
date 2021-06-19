const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) =>
  connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId })
  );

const findId = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) =>
    db.collection('recipes').findOne(new ObjectId(id))
  );
};

module.exports = { create, findId };   