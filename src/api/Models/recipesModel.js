const connection = require('./conn');

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


module.exports ={
  create,
  getAll,
};
