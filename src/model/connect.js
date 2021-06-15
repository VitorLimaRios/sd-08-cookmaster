const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Para teste local
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

// Para subir
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

let db = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((con) => {
        db = con.db(DB_NAME);
        return db;
      })
      .catch((_err) => null);
};

module.exports = connection;