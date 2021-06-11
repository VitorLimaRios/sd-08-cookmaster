const connection = require('./connection');
const create = async (collection, data  ) => {
  const result = await  connection()
    .then((db) =>  db.collection(collection).insertOne(data ));
  if (!result) return null;
  return result.ops;
};

module.exports = create;