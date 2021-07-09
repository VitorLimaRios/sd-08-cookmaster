const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// LOCAL
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

// AVALIADOR
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

// let db = null;

const connection = () => {
  return MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
      db = conn.db(DB_NAME);
      return db;
    });
};

// db ? Promise.resolve(db) : 

module.exports = connection;
