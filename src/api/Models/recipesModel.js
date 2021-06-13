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

// const findEmail = (email) =>
//   connection().then((db) => db.collection('recipes').findOne({ email }));

module.exports ={
  create,
  // findEmail,
};
