const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DB_NAME = 'Cookmaster';

// Local
const MONGO_DB_URL = 'mongodb://localhost:27017///Cookmaster';

//Avaliador
//const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const connection = async () => {
  try {
    const connect = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
    const db = connect.db(DB_NAME);
    return db;
  } catch (err) {
    console.error(`DB ${DB_NAME} connection error`);
    return process.exit(1);
  }
};

module.exports = connection;
