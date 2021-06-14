const connection = require('../connection');
const { ObjectId } = require('mongodb');

module.exports = async (id, imagePath) => {
  const _id = ObjectId(id);
  const { name, ingredients, preparation, userId } = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

  await connection()
    .then((db) => db.collection('recipes')
      .updateOne(
        { _id },
        {
          $set: {
            name: name,
            ingredients: ingredients,
            preparation: preparation,
            userId: userId,
            image: imagePath,
          }
        }));

  return ({ _id, name, ingredients, preparation, userId, image: imagePath });
};
