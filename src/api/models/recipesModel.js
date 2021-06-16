const { Db } = require('mongodb');
const connection = require('./connection');

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

module.exports = {
  criarReceita,
  listarReceitas,
};