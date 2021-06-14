const connection = require('../config/connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  console.log(name, ingredients, preparation, userId);
  const recipe = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }))
    .then(result => result.ops[0]);
  return { recipe: { 
    _id: recipe._id,
    name,
    ingredients,
    preparation,
    userId,
  }};
};

module.exports = { 
  createRecipe,
};

