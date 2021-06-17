const { Db } = require('mongodb');
const connection = require('./connection');
const { ObjectId } = require('mongodb');

const criarReceita = async (receita) => {
  const {name, ingredients, preparation, _id} = receita;
  const db = await connection();
  const adiconaReceita = await db.collection('recipes')
    .insertOne({name, ingredients, preparation, userId:_id});
  return {
    recipe: {
      ...adiconaReceita.ops[0],
      _id: adiconaReceita.insertedId,
    }
  };
};

const listarReceitas = async () => {
  const db = await connection();
  const receita = await db.collection('recipes').find().toArray();
  if (receita) return receita;
};

const buscarReceitaPorId = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const idReceita = await db.collection('recipes').findOne(ObjectId(id));
  return idReceita;
};

const atualizarReceita = async(id, receita) => {
  const {name, ingredients, preparation} = receita;
  const db = await connection();
  const novareceita = await buscarReceitaPorId(id);
  await db.collection('recipes')
    .updateOne({ _id: id}, { $set: { name, ingredients, preparation } });
  return { _id: id, name, ingredients, preparation, userId: novareceita.userId};
};

const deletarReceita = async(id) => {
  const db = await connection();
  const deletarReceita = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return deletarReceita;
};

module.exports = {
  criarReceita,
  listarReceitas,
  buscarReceitaPorId,
  atualizarReceita,
  deletarReceita,
};