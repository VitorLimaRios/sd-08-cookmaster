const connect = require('./connection');

const create = async (name, ingredients, preparation) => {
  const recipesCollection = await connect()
    .then((db) => db.collection('recipes'));

  const { insertedId: _id } = await recipesCollection
    .insertOne({ name, ingredients, preparation });

  return {
    _id,
  };
};

const getByEmail = async (email) => connect()
  .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  create,
  getByEmail,
};
