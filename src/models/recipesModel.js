const { ObjectId, ObjectID } = require('bson');
const connect = require('./mongoConnection');

const COLLECTION = 'recipes';

const validateId = (id) => ObjectID.isValid(id);

const addRecipe = async (recipe) => {
  return connect()
    .then((db) => db.collection(COLLECTION).insertOne(recipe))
    .then((result) => result.ops[0]);
};

const getRecipes = async () => {
  return connect()
    .then((db) => db.collection(COLLECTION).find().toArray());
};

const getRecipeById = async(id) => {
  if(!validateId(id)) return;
  return connect()
    .then((db) => db.collection(COLLECTION).findOne({ _id: ObjectId(id) }));
};

const editRecipe = async(recipe, id) => {
  return connect()
    .then((db) => db.collection(COLLECTION)
      .updateOne({_id: ObjectId(id)}, {$set: {...recipe}}));
};

const deleteRecipe = async(id) => {
  return connect()
    .then((db) => db.collection(COLLECTION).deleteOne({ _id: ObjectId(id)}));
};


module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe
};