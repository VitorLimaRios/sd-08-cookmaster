const { MongoClient } = require('mongodb');

/* banco local para testes: */
//const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
/* banco para subir no repositório: */
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => { 
        db = conn.db(DB_NAME);
        return db;
      });
};

module.exports = connection;
