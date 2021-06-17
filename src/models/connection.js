const { MongoClient } = require('mongodb');

const {
  URL_MONGODB_EVALUATION: URL,
  NAME_OF_DATABASE,
  OPTIONS,
} = require('../shared/defs');

const connection = async () => {
  const conn = await MongoClient.connect(URL, OPTIONS);
  return conn.db(NAME_OF_DATABASE);
};

module.exports = connection;
