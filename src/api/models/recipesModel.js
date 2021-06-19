const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertRecipe = async (name, ingredients, preparation, _id) =>
  await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId: ObjectId(_id)}))
    .then((result) => (
      { recipe: {
        _id: result.insertedId,
        name, ingredients, preparation,
        userId: ObjectId(_id) } }));

const findByName = async (nameNewRecipe) =>
  await connection()
    .then((db) => db.collection('recipes').findOne({ name: nameNewRecipe }))
    .then(response => response)
    .catch(err => console.log(err));

// const findById = async (id) => {
//   try {
//     const db = await connection();
//     return await db.collection('users')
//       .findOne(new ObjectId(id));
//   } catch (error) {
//     return null;
//   }
// };

// const getAll = async () => {
//   try {
//     const db = await connection();
//     return await db.collection('users').find().toArray();
//   } catch (error) {
//     return null;
//   }
// };

// const updateByID = async (id, name, quantity) =>{
//   try {
//     const db = await connection();
//     return await db.collection('users')
//       .updateOne(
//         { '_id': ObjectId(id) },
//         { $set: { 'name': name, 'quantity': quantity },
//         });
//   } catch (error) {
//     return null;
//   }
// };

// const deleteByID = async (id) =>{
//   try {
//     const db = await connection();
//     return await db.collection('users')
//       .deleteOne({ '_id': ObjectId(id) });
//   } catch (error) {
//     return null;
//   }
// };

module.exports = {
  insertRecipe,
  findByName,
};
