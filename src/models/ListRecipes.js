const { ObjectId } = require('mongodb');
const connection = require('./connection');

const ListRecipes = async (_id) => {
  let recipes;
  const db = await connection();

  try {
    if (_id) {
      recipes = await db.collection('recipes')
        .findOne({ _id: ObjectId(_id) });
      
    } else {
      recipes = db.collection('recipes').find().toArray();
    }
    
    return recipes;
  } catch {
    return;
  }
};

module.exports = ListRecipes;