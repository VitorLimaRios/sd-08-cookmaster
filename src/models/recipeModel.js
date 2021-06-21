const connect = require('./connection');

const getByEmail = async (email) => {
  return connect().then((db) =>
    db.collection('users').findOne({ email: email })
  );
};

const add = async (name, ingredients, preparation, userId) =>
  connect()
    .then((db) =>
      db.collection('recipes').insertOne({
        name,
        ingredients,
        preparation,
        userId,
      })
    )
    .then((result) => result.ops[0]);

const getAll = async () =>
  connect().then((db) => db.collection('recipes').find().toArray());

module.exports = {
  getByEmail,
  add,
  getAll,
};
