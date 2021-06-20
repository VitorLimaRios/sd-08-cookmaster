const connection = require('./connections');
const { ObjectId } = require('mongodb');

async function createRecipes(recipes) {
  // const { name, email, password } = user;
  try {
    const result = await connection()
      .then((db) => db.collection('recipes').insertOne(recipes))
      .then((result) => result);
    const ops2 =  await result;
    return ops2.ops[0];
  } catch (e) {
    console.log(e);
  }
}

async function getAllRecipes() {
  // const { name, email, password } = user;
  try {
    const result = await connection()
      .then((db) => db.collection('recipes').find().toArray())
      .then((result) => result);
    // const ops2 =  await result;
    // console.log(ops2);
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function getRecipeById(id) {
  // const { name, email, password } = user;
  try {
    const result = await connection()
      .then((db) => db.collection('recipes')
        .findOne( ObjectId(id) ))
      .then((result) => result);
    // const ops2 =  await result;
    // console.log(ops2);
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function updateRecipe( id, recipe ) {
  // const { name, ingredients, preparation } = recipe;
  try {
    const result = connection()
      .then((db) => db.collection('recipes')
        .updateOne(
          {_id: ObjectId(id)},
          {$set: recipe})
      ).then((result) => result);
    return result;
  } catch (err) {
    console.log(err);
  }
};

async function deleteRecipe(id) {
  const deletedRecipe = await connection()
    .then((db) => db.collection('recipes')
      .deleteOne({_id: ObjectId(id)}));
  return deletedRecipe;
};



// async function findByEmail(email) {
//   try {
//     const IsEmail = connection()
//       .then((db) => db.collection('users')
//         .findOne( {email} ))
//       .then((result) => result );
//     return IsEmail;
//   } catch (e) {
//     console.log(e);
//   }
// };

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};
