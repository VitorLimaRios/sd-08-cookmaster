const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createRecipe = async (name, ingredients, preparation, userId) => {
  return connection()
    .then((db) =>
      db.collection('recipes').insertOne({ name, ingredients, preparation, userId })
    )
    .then((result) => result.ops[0])
    .catch((err) => err);
};

const getRecipes = async () => {
  return connection().then((db) => db.collection('recipes').find().toArray());
};

const findRecipe = (id) => {
  return connection().then((db) => db.collection('recipes').findOne(new ObjectId(id)));
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  return connection()
    .then((db) =>
      db.collection('recipes').updateOne(
        {
          _id: new ObjectId(id),
        },
        { $set: { name, ingredients, preparation } },
      ),
    )
    .then(() => ({ _id: id, name, ingredients, preparation }));
};

const deleteRecipe = async (id) => {
  return connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: new ObjectId(id)}));
};

module.exports = {
  createRecipe,
  getRecipes,
  findRecipe,
  updateRecipe,
  deleteRecipe
};
