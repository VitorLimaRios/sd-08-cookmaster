const { ObjectId } = require('mongodb');
const connectionDB = require('../../connections/ConnectionDB');
const { COLLECTION_RECIPES } = require('../../utils/consts');

const create = async (name, ingredients, preparation, userId) => {
  return connectionDB()
    .then((db) => db.collection(COLLECTION_RECIPES)
      .insertOne({ name, ingredients, preparation, userId }))
    .then((result => result.ops[0]))
    .then(data => (
      {
        name: data.name,
        ingredients: data.ingredients,
        preparation: data.preparation,
        userId: data.userId,
        _id: data._id,
      }
    ));
};

const getAll = async () => {
  return connectionDB()
    .then((db) => db.collection(COLLECTION_RECIPES).find().toArray()
      .then(result => result));
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return {};

  return connectionDB()
    .then((db) => db.collection(COLLECTION_RECIPES).findOne(new ObjectId(id))
      .then((result) => {
        if (result !== null) return result;
        return {};
      }));
};

module.exports = {
  create,
  getAll,
  getRecipeById,
};
