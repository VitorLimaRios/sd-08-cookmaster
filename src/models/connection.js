const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const MONGO_DB_URL = 'mongodb://localhost:27017/';
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

let db = null;

const connection = async () => {
  const conn = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
  const db = conn.db(DB_NAME);
  return db;
};

module.exports = connection;
