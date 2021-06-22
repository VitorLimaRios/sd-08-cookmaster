const { ObjectId, ObjectID } = require('mongodb');
const connect = require('./connect');

const TABLE_RECIPES = 'recipes';

const addRecipes = async (data, id) => {
  const { name, ingredients, preparation } = data;

  await connect()
    .then((db) => db.collection(TABLE_RECIPES)
      .insertOne({ name, ingredients, preparation, userId: id }))
    .catch((_err) => console.log('Ops, não salvei a receita'));
};

const findOneRecipes = async (id) => {
  const findById = await connect()
    .then((db) => db.collection(TABLE_RECIPES)
      .find({ userId: id }).toArray())
    .catch((_err) => console.log('Ops, não encontrei a receita'));
  return findById;
};

const findById = async (params) => {
  const findById = await connect()
    .then((db) => db.collection(TABLE_RECIPES)
      .findOne({ _id: ObjectId(params) }))
    .catch((_err) => console.log('Ops, não encontrei a receita'));
  return findById;
};

const getAll = async () => {
  const findAll = await connect()
    .then((db) => db.collection(TABLE_RECIPES)
      .find().toArray())
    .catch((_err) => console.log('Ops, não encontrei todas as receitas'));
  return findAll;
};

const updateRecipeId = async (params, body) => {
  const { name, ingredients, preparation } = body;
  const findById = await connect()
    .then((db) => db.collection(TABLE_RECIPES)
      .updateOne({ _id: ObjectId(params) }, { $set: { name, ingredients, preparation } }))
    .catch((_err) => console.log('Ops, não encontrei a receita'));
  return findById;
};

module.exports = {
  addRecipes,
  findOneRecipes,
  getAll,
  findById,
  updateRecipeId,
};
  