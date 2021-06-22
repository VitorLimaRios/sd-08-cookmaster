const DB_NAME = 'Cookmaster';

const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/* teste local */
/* const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster'; */


/* teste remoto */
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

let db = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => {
      db = conn.db(DB_NAME);
      return db;
    });
};

module.exports = connection;
