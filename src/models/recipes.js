const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getDbCollection = async () => connection()
  .then((db) => db.collection('recipes'));

const createRecipe = async (name, ingredients, preparation, userId) => getDbCollection()
  .then((collection) => collection.insertOne({ name, ingredients, preparation, userId }));

const getRecipes = async () => getDbCollection()
  .then((collection) => collection.find().toArray());

const getRecipeById = async (id) => getDbCollection()
  .then((collection) => collection.findOne(ObjectId(id)));

const updateRecipe = async (_id, name, ingredients, preparation) => {
  await getDbCollection()
    .then((collection) => collection.updateOne(
      { _id: ObjectId(_id) },
      { $set: { name, ingredients, preparation } },
    ));

  const updatedRecipe = await getRecipeById(_id);
  return updatedRecipe;
  
};

const deleteRecipe = async (id) => getDbCollection()
  .then((collection) => collection.deleteOne({ _id: ObjectId(id) }));

const insertImage = async (id, imageUrl) => {
  const recipeWithImage = await getDbCollection()
    .then((collection) => collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { image: imageUrl } },
      { returnOriginal: false },
    ));
  return recipeWithImage.value;
};

const getImage = async (id) => getDbCollection()
  .then((collection) => collection.findOne(
    { _id: ObjectId(id) }, { _id: 0, image: 1 },
  ));


module.exports = {
  createRecipe,   
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  insertImage,
  getImage,
};