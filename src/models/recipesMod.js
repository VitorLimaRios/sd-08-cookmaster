const { ObjectId } = require('mongodb');
const connect = require('./connection');

const addRecipes = (name, ingredients, preparation, userId) => 
  connect().then( async (db) => {
    const postRecipes = await db.collection('recipes')
      .insertOne({name, ingredients, preparation, userId});

    return postRecipes.ops[0];
  });

const getAllRecipes = async () =>
  connect().then((db) => db.collection('recipes').find().toArray());  

const getById = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  const recipesById = await connect()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id)}));
  console.log('------------');
  console.log('recipesById Models', recipesById);
  return recipesById;
};

const update = async (name, ingredients, preparation, userId) => {
  const updateRecipes = await connect().then((db) => 
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(userId) },
        { $set: { name, ingredients, preparation } }));
 
  // console.log('linha 48 models', updateProducts);
  return updateRecipes;
};

const exclude = async (id) => {
  // console.log('exclude recipesMod', id);

  const deleteRecipe = await connect().then((db) => 
    db.collection('recipes').deleteOne({ _id: ObjectId(id) })
  );
  return deleteRecipe;
};


module.exports = {
  addRecipes,
  getAllRecipes,
  getById,
  update,
  exclude,
};