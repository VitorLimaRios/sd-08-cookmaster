const { ObjectId } = require('mongodb');
const connection = require('./connection');

const SendImage = async ({ id, image }) => {
  const db = await connection();

  const newRecipe = await db
    .collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          image,
        }
      }
    );
  
  return newRecipe;
};

module.exports = SendImage;