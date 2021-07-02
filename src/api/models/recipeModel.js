const connect = require('./connection');

const addRecipe = async(userId, name, ingredients, preparation) =>
  connect().then(async(db) => {
    const result = await db.collection('recipes').insertOne({userId, name, ingredients, preparation});
    return result.ops[0];
  });

module.exports = {addRecipe};