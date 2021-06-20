const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster'; // usar no db local
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster'; // usar no avaliador

const DB_NAME = 'Cookmaster';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connection = async () => {
  if (db) return Promise.resolve(db);
  return MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => {
    db = conn.db(DB_NAME);
    return db;
  });
};

module.exports = connection;
