const connection = require('../connection');
const { ObjectId } = require('mongodb');

module.exports = async (id) => {
  const result = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

  return result;
};
