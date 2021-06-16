const { ObjectId } = require('mongodb');


const connection = require('../connection');

const RECIPES = 'recipes';
const createRecipes = async (recipes) => {
  try {
    const { name, ingredients, preparation, _id } = recipes;
    const db = await connection();
    const result = await db.collection(RECIPES).insertOne({
      name,
      ingredients,
      preparation,
      userId: _id,
    });
    return result.ops[0];
  } catch (error) {
    return { error: error.message };
  }
};

const getAll = async()=>{
  const  result = await connection().then(db=>db.collection(RECIPES).find().toArray());
  return result;
};
const getOne = async(id)=>{
  const result = await connection()
    .then(db=>db.collection(RECIPES).findOne({_id:ObjectId(id)}));
  if(!result) return null;
  return result;
};

const update = async(id,recipe) =>{
  const updated =  await connection()
    .then(db=>db.collection(RECIPES).updateOne({_id:ObjectId(id)},{$set:recipe}));
  return updated;
};

const deleteOne = async(id) =>{
  const deleted =  await connection()
    .then(db=>db.collection(RECIPES).removeOne({_id:ObjectId(id)}));
  return deleted;
};

const addImage = async (recipeId, image) => {
  const db = await connection();
  const result = await db.collection(RECIPES)
    .updateOne({ _id: ObjectId(recipeId) }, { $set: { image } });
  return result;
};
module.exports = {
  createRecipes,getAll,getOne,update,deleteOne,addImage
};