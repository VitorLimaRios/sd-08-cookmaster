const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createRecipes = async (newRecipe) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ ...newRecipe }));
  return { recipe: { ...newRecipe, _id: insertedId } };
};

const findAll = async () => {
  const allRecipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return allRecipes;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const idRecipe = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return idRecipe;
};

const updateById = async ({ _id, name, ingredients, preparation, userId }) => {
  await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(_id) },
        { $set: { name, ingredients, preparation, userId: ObjectId(userId) } }));
  return {
    _id, name, ingredients, preparation, userId
  };
};


const deleteRecipe=async(id)=>{ 
  await connection()
    .then((db) => db.collection('products')
      .deleteOne({ _id: ObjectId(id) }));
};

const updateImage=async(_id,image)=>{
  const recipe=await findById(_id);
  if(!recipe){return null;}
  await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(_id) },
        { $set: { image: image } }));
  
  return {
    ...recipe ,image
  };
};
//console.log(updateImage('60de96bd6154628c0379eeea','caminho da imagem'));

module.exports = {
  createRecipes,
  findAll,
  findById,
  updateById,
  deleteRecipe,
  updateImage
};