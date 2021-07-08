const { ObjectId } = require('mongodb');
const connection = require('./connection');

const recipesCollection = 'recipes';

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection(recipesCollection).findOne({ _id: ObjectId(id) }));
};

const createRecipe = async ({ recipe }) => {
  return connection()
    .then((db) => db.collection(recipesCollection).insertOne(recipe))
    .then((result) => getById(result.insertedId));
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection(recipesCollection).find({}).toArray());
};

const updateRecipe = async (id, body) => {
  return connection()
    .then((db) => db.collection(recipesCollection).updateOne(
      { _id: ObjectId(id) },
      { 
        $set: {
          name: body.name,
          ingredients: body.ingredients,
          preparation: body.preparation,
        }
      }
    ));
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection(recipesCollection).deleteOne({ _id: ObjectId(id) }));
};


module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  deleteById,
};
