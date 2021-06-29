const connection = require('./connection');
const { ObjectId } = require('mongodb'); 

const createRecipe = async (objDataForCreate) => {
  const db = await connection();
  const { ops } = await db.collection('recipes').insertOne(objDataForCreate);
  return ops[0];
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const getById = async (id) => {
  const db = await connection();
  try {
    const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    return result;
  } catch (err) {
    console.error(`Id ${id} not found \n.`);
    return null;
  }
};

const updateById = async (id, dataForUpdate) => {
  console.log(id);
  try{
    const db = await connection();
    const result = await db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: dataForUpdate });;
    return result;
  }catch (err) {
    console.error(`ID ${id} invalid id`);
    return null;
  }
};

const remove = async (id) => {
  const db = await connection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createRecipe,
  getAll, 
  getById,
  updateById,
  remove
};