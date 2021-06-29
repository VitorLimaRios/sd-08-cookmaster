const connection = require('./connection');

const createRecipes = async (newRecipe) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ ...newRecipe}));
  return { recipe:{...newRecipe, _id: insertedId } };
};

// const obj={
//   'name': 'Arroz e feijao',
//   'ingredients': 'arroz com feijao',
//   'preparation': 'Na panela'
// };
// console.log(createRecipes(obj));

module.exports = {
  createRecipes
};