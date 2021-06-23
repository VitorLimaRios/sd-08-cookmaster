const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();

let connection;

const mock = async () => {
  const URLMock = await DBServer.getUri();

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return connection ? connection : MongoClient.connect(URLMock, options);
};

module.exports = mock;