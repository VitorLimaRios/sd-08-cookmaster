const { ObjectId } = require('mongodb');
const connect = require('./connection');

const addRecipes = (name, ingredients, preparation, userId) => 
  connect().then( async (db) => {
    const insertRecipes = await db.collection('recipes')
      .insertOne({name, ingredients, preparation, userId});

    return insertRecipes.ops[0];
  });

const getAllRecipes = async () =>
  connect().then((db) => db.collection('recipes').find().toArray());  

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  const recipesById = await connect()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

  return recipesById;
};

const update = async (name, ingredients, preparation, userId) => {
  const updateRecipes = await connect().then((db) => 
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(userId) },
        { $set: { name, ingredients, preparation } }));

  return updateRecipes;
};

const exclude = async (id) => {
  const deleteRecipe = await connect().then((db) => 
    db
      .collection('recipes')
      .deleteOne({ _id: ObjectId(id) })
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
