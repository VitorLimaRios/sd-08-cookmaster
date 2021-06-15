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
  if (!ObjectId.isValid(id)) return null;

  return connectionDB()
    .then((db) => db.collection(COLLECTION_RECIPES).findOne(new ObjectId(id))
      .then(result => result));
};

const update = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return {};
  const newData = { name, ingredients, preparation };
  const recipeId = new ObjectId(id);

  return connectionDB()
    .then((db) => db.collection(COLLECTION_RECIPES)
      .findOneAndUpdate(
        { _id: recipeId },
        { $set: newData },
        { returnOriginal: false })
      .then(result => result.value));
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipeId = new ObjectId(id);
  return connectionDB()
    .then((db) => db.collection(COLLECTION_RECIPES).findOneAndDelete({_id: recipeId})
      .then(result => result.value));
};

module.exports = {
  create,
  getAll,
  getRecipeById,
  update,
  deleteRecipe,
};
