const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const recipe = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId
  });

  return recipe.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getById = async (id) => {
  ObjectId(id);
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({_id: ObjectId(id)});
  return recipe;
};

const updateById = async ({id, name, ingredients, preparation}) => {
  const db = await connection();
  const updatedRecipe = await db.collection('recipes')
    .findOneAndUpdate({_id: ObjectId(id)},
      { $set: { name, ingredients, preparation }},
      {returnOriginal: false });
  return updatedRecipe.value;
}; 

const deleteById = async (id) => {
  const db = await connection();
  await db.collection('recipes').findOneAndDelete({_id: ObjectId(id)});
  return;
};

const addImage = async (id, image) => {
  const db = await connection();
  const { value } = await db.collection('recipes')
    .findOneAndUpdate({_id: ObjectId(id)},
      { $set: { image }},
      {returnOriginal: false });
  return value;
}; 



module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  addImage,
};
