require('dotenv').config();
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DB_NAME = 'Cookmaster';
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://mongodb:27017/Cookmaster';

let db = null;

const connection = async () => {
  if (db) {
    return Promise.resolve(db);
  }

  const conn = await MongoClient.connect(MONGODB_URL, OPTIONS);
  db = conn.db(DB_NAME);
  return db;
};

module.exports = connection;
