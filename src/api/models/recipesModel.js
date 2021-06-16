const { Db } = require('mongodb');
const connection = require('./connection');
const { ObjectId } = require('mongodb');

const criarReceita = async (receita) => {
  const {name, ingredients, preparation, _id} = receita;
  const db = await connection();
  const adiconaReceita = await db.collection('recipes')
    .insertOne({name, ingredients, preparation, _id});
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

module.exports = {
  criarReceita,
  listarReceitas,
  buscarReceitaPorId,
};