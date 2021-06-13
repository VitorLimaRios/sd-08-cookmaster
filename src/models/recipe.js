const connection = require('./connection');
const { ObjectId } = require('bson');

const create = async (name, ingredients, preparation, userId) =>
  connection().then ((db) => db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId }));

const getAll = async () =>
  connection().then ((db) => db.collection('recipes')
    .find().toArray());

const getOne = async (id) =>
  connection().then ((db) => db.collection('recipes')
    .findOne(ObjectId(`${id}`)));

const update = async (id, name, ingredients, preparation) => {
  connection().then ((db) => db.collection('recipes')
    .updateOne(
      { _id: ObjectId(`${id}`) },
      { $set: { name, ingredients, preparation } }
    )
  );
  const updatedRecipe = await getOne(id);
  return updatedRecipe;
};

const exclude = async (id) => {
  const recipe = await getOne(id);
  connection().then ((db) => db.collection('recipes').deleteOne(
    { _id: ObjectId(`${id}`) }
  ));
  return recipe;
};

const updateImage = async (id, image) => {
  connection().then ((db) => db.collection('recipes')
    .updateOne(
      { _id: ObjectId(`${id}`) },
      { $set: { image } }
    )
  );
  const updatedRecipe = await getOne(id);
  return updatedRecipe;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  updateImage,
  exclude,
};
