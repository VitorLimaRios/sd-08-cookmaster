const connection = require('./connection');

const create = async (name, ingredients, preparation) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({name, ingredients, preparation}))
    .then((data) => {
      const [result] = data.ops;
      return result;
    });

const getAll = async () =>
  connection()
    .then((db) => db.collection('recipes').find().toArray());



module.exports = {
  create,
  getAll
};
