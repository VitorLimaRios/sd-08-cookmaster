const { ObjectId } = require('mongodb');
const connection = require('./connection');

const UpdateRecipe = async ({ id, name, ingredients, preparation }) => {
  const db = await connection();

  const newRecipe = await db
    .collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          ingredients,
          preparation,
        }
      }
    );
  
  return newRecipe;
};

module.exports = UpdateRecipe;