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

module.exports = {
  writeRecipes,
  readRecipes,
};