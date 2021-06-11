const mongoClient = require('mongodb').MongoClient;

// A conexão do banco local deverá conter os seguintes parâmetros:
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

// Para o avaliador funcionar altere a conexão do banco para:
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

const connection = async () => {
  return mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      userUnifiedTopology: true,
    })
    .then((connection) => connection.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connection;
