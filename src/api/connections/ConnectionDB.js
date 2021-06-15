const { MongoClient } = require('mongodb');
const { MONGO_DB_URL_LOCAL, OPTIONS, DB_NAME, MONGO_DB_URL } = require('../utils/consts');

const connectionDB = () => {
  return MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => console.log('Connected to the MongoDB.') || conn.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit();
    });
};

module.exports = connectionDB;
