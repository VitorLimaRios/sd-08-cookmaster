const connection = require('./conn');
const { ObjectId } = require('mongodb');


const create = async (name, ingredients, preparation, userId) =>{
  const db = await connection();
  const newRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  // console.log(newRecipe.ops[0]);
  // return desestruturando <3
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
  // console.log(recipes);
  if (recipes) return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipeId = await db.collection('recipes').findOne(ObjectId(id));
  // console.log(recipeId);
  return recipeId;
};

const update = async ( id, name, ingredients, preparation ) => {
  const db = await connection();
  await  db.collection('recipes')
    .updateOne({ _id: id}, { $set: { name, ingredients, preparation } });
  return { _id: id, name, ingredients, preparation};
};

const excludes = async (id) => {
  const db = await connection();
  const recipesId = await db.collection('recipes').deleteOne({ _id: ObjectId(id)});
  return recipesId;
};

module.exports ={
  create,
  getAll,
  getById,
  update,
  excludes,
};
