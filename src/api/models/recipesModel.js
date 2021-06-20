const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertRecipe = async (name, ingredients, preparation, _id) =>
  await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId: ObjectId(_id)}))
    .then((result) => (
      { recipe: {
        _id: result.insertedId,
        name, ingredients, preparation,
        userId: ObjectId(_id) } }));

const findByName = async (nameNewRecipe) =>
  await connection()
    .then((db) => db.collection('recipes').findOne({ name: nameNewRecipe }))
    .then(response => response)
    .catch(err => console.log(err));

const findById = async (id) => {
  try {
    const db = await connection();
    return await db.collection('recipes')
      .findOne(new ObjectId(id));
  } catch (error) {
    return null;
  }
};

const getAll = async () => {
  try {
    const db = await connection();
    return await db.collection('recipes').find().toArray();
  } catch (error) {
    return null;
  }
};

const updateByID = async (id, name, ingredients, preparation) =>{
  try {
    const db = await connection();
    return await db.collection('recipes')
      .updateOne(
        { '_id': ObjectId(id) },
        { $set:
          {
            'name': name,
            'ingredients': ingredients,
            'preparation': preparation },
        });
  } catch (error) {
    return null;
  }
};

const deleteByID = async (id) =>{
  try {
    const db = await connection();
    return await db.collection('recipes')
      .deleteOne({ '_id': ObjectId(id) });
  } catch (error) {
    return null;
  }
};

module.exports = {
  insertRecipe,
  findByName,
  getAll,
  findById,
  updateByID,
  deleteByID,
};
