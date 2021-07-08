const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

const mockedConnection = async () => {
  const DBServer = await MongoMemoryServer.create();
  const URLMock = await DBServer.getUri();
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };  
  const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

  return connectionMock;
}

module.exports = mockedConnection;