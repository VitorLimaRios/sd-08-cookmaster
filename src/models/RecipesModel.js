const connection = require('./connection');
const { ObjectID } = require('mongodb');

const finUserEmail = async (email) => {
  try {
    const response = await connection()
      .then((db) => db.collection('users').find({ email: email }).toArray());
    return response;
  } catch (error) {
    console.log(error);
  }
};

const insertRecipe = async ({ name, ingredients, preparation, userId }) => {
  try {
    const response = await connection().then((db) => db.collection('recipes')
      .insert({ name, ingredients, preparation, userId }));
    return response.ops[0];
  } catch (error) {
    console.log(error);
  }
};

const getRecipes = async () => {
  try {
    const response = await connection().then((db) => db.collection('recipes')
      .find().toArray());
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getRecipeID = async (id) => {
  try {
    const response = await connection()
      .then((db) => ObjectID(id) ? db.collection('recipes')
        .find({_id: ObjectID(id)}).toArray(): false);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const editRecipe = async (ObjectValues) => {
  const { idUserLogin, idRecipe, name, ingredients, preparation } = ObjectValues;
  try {
    const response = await connection().then((db) => db.collection('recipes')
      .updateOne({_id: ObjectID(idRecipe)}, {$set: { name, ingredients, preparation }}));
    return {
      _id: idRecipe,
      name,
      ingredients,
      preparation,
      userId: idUserLogin,
    };
  } catch (error) {
    console.log(error);
  }
};

const deleteRecipeBank = async (idRecipe) => {
  const response = await connection().then((db) => db.collection('recipes')
    .deleteOne({_id: ObjectID(idRecipe)}));
  return response.deletedCount;
};

module.exports = {
  finUserEmail,
  insertRecipe,
  getRecipes,
  getRecipeID,
  editRecipe,
  deleteRecipeBank,
};
