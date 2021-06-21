const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async(name, ingredients, preparation, userId) => {
  const db = await connection();
  const createRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: createRecipe.insertedId,
    }
  };
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();

  if(recipes) return recipes;
};

const getById = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));
  return recipe;
};

const updateRecipe = async ( id, name, ingredients, preparation ) => {
  const db = await connection();
  const recipe = await getById(id);
  await db.collection('recipes');
  await db.collection('recipes')
    .updateOne({ _id: id }, { $set: { name, ingredients, preparation } });
  return { _id: id, name, ingredients, preparation, userId: recipe.userId };
};

const deleteRecipe = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return recipe;
};

const sendImage = async (id, image) => {
  const db = await connection();
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { image } } );
  const recImage = await getById(id);
  return recImage;
};

module.exports = {
  create,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
  sendImage,
};
