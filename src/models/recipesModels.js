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

module.exports = { createRecipes };
