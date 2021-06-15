const { MongoClient } = require('mongodb');

const DB_NAME = 'Cookmaster';

// A conexão do banco local deverá conter os seguintes parâmetros:
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

// Para o avaliador funcionar altere a conexão do banco para:
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const connection = async () => {
  try {
    const connection = await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return connection.db(DB_NAME);
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

module.exports = connection;