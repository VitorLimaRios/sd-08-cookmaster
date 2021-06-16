const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Criar Receita
const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));

  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipe.insertedId,
  };
};

// Listar todas as Receitas
const getAllRecipes = async () => {
  const allRecipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  
  return allRecipes;
};

// Procurar uma receita pelo ID
const findByIdRecipe = async (id) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  
  return recipe;
};

// Editar uma receita pelo ID
const updateRecipe = async (id, name, ingredients, preparation) => {
  const recipeUpdated = await connection()
    .then((db) => db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    ));

  return recipeUpdated.value;
};

// Remover uma receita pelo ID
const removeRecipe = async (id) => {
  const recipeDeleted = await connection()
    .then((db) => db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) }));

  return recipeDeleted.value;
};

// Adicionar uma imagem na receita pelo ID
const addImageRecipe = async (id, image) => {
  const recipeUpdated = await connection()
    .then((db) => db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { image } },
      { returnOriginal: false },
    ));

  return recipeUpdated.value;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findByIdRecipe,
  updateRecipe,
  removeRecipe,
  addImageRecipe,
};
