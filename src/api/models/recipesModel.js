const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createRecipe = async (name, ingredients, preparation, userId) =>{
  const db = await connection();
  const newRecipe = await db.collection('recipes')
    .insertOne({ userId, name, ingredients, preparation });
  
  return { recipe: {
    name,
    ingredients,
    preparation,
    userId,
    _id: newRecipe.insertedId,
  } };
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();

  return recipes;
};

const getById = async (id) => {
  const db = await connection();

  if (!ObjectId.isValid(id)) return null;

  const recipes = await db.collection('recipes').findOne(ObjectId(id));

  return recipes;
};

const update = async ( id, name, ingredients, preparation ) => {
  const db = await connection();
  const recipe = await getById(id);
  await  db.collection('recipes')
    .updateOne({ _id: id}, { $set: { name, ingredients, preparation } });
  return { _id: id, name, ingredients, preparation, userId: recipe.userId};
};

const exclude = async (id) => {
  const db = await connection();

  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const upload = async (id, image) => {
  const db = await connection();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image }});
  const imageRecipe = await getById(id);
  return imageRecipe;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  update,
  exclude,
  upload,
};