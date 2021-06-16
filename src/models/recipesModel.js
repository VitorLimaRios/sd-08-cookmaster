const { ObjectId } = require('mongodb');

const connection = require('../connection/connection');

const NAME_COLLECTION = 'recipes';

const writeRecipes = async (userId, name, ingredients, preparation) => {
  try {
    const db = await connection();

    return await db
      .collection(NAME_COLLECTION)
      .insertOne({
        name,
        ingredients,
        preparation,
        imageURL: 'caminho da imagem',
        userId,
      });

  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const readRecipes = async () => {
  try {
    const db = await connection();

    const result = await db
      .collection(NAME_COLLECTION)
      .find({}).toArray();

    return result;

  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const readRecipesById = async (id) => {
  try {
    const db = await connection();

    return await db
      .collection(NAME_COLLECTION)
      .findOne({ _id: ObjectId(id) });

  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const editRecipesById = async ({ id, name, ingredients, preparation }) => {
  try {
    const db = await connection();

    return await db
      .collection(NAME_COLLECTION)
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const removeRecipesById = async (id) => {
  try {
    const db = await connection();

    return await db
      .collection(NAME_COLLECTION)
      .deleteOne({ _id: ObjectId(id) });

  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  writeRecipes,
  readRecipes,
  readRecipesById,
  editRecipesById,
  removeRecipesById,
};