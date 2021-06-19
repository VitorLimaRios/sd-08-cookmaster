require('dotenv').config();

const { MongoClient } = require('mongodb');

let db = null;

let conn = null;

const connection = async () => {
  if (db) return db;

  try {
    conn = await MongoClient.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    db = await conn.db(process.env.DB_NAME);
    
    return db;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connection;