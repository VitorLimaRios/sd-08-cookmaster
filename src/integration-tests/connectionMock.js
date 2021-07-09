const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

let connectionMonck;

const DBServer = new MongoMemoryServer();
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getConnection = async()=>{
  const URLMock = await DBServer.getUri();
  return connectionMonck
   ? connectionMonck
   : MongoClient.connect(URLMock, OPTIONS)
};


module.exports = getConnection ;