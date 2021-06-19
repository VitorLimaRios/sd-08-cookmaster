require('dotenv').config();
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const urlLocal = 'mongodb://localhost:27017/Cookmaster';
const urlAval = 'mongodb://mongodb:27017/Cookmaster';
const urlAvaliador = (avaliador) => avaliador ? urlAval : urlLocal;

const MONGO_DB_URL = urlAvaliador(true);
const DB_NAME = 'Cookmaster';
const connection = () => { // depois tentar com o async await
  return MongoClient
    .connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;
