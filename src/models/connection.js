require('dotenv').config()
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = process.env.MONGO_DB_URL_LOCAL || process.env.MONGO_DB_URL_AVALIADOR;
const DB_NAME = process.env.DB_NAME;

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
