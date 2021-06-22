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
      .findOne({ userId: id }))
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

module.exports = {
  addRecipes,
  findOneRecipes,
  getAll,
};
  