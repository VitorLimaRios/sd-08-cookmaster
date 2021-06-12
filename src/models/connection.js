const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';


const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

module.exports = async () => {
  if (db) return db;
  try {
    const connection = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
    db = await connection.db(DB_NAME);
    return db;
  } catch (error) {
    console.log(`Eu ${error}`);
    process.exit(1);
  }
};