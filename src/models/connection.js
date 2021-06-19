require('dotenv').config();

const { MongoClient } = require('mongodb');

const { MONGO } = require('../constants/');

let db = null;

let conn = null;

const connection = async () => {
  if (db) return db;

  try {
    conn = await MongoClient.connect(MONGO.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    db = await conn.db(MONGO.DB_NAME);
    
    return db;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connection;
