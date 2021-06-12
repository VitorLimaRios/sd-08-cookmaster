require('dotenv').config()
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// local:
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

// avaliador:
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

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
