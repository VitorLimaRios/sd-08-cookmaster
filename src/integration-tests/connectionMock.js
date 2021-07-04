const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

let connectionMock;
const DBServer = new MongoMemoryServer();

const getConnection = async () => {
    const URLMock = await DBServer.getUri();

    return connectionMock
        ? connectionMock
        : MongoClient.connect(URLMock, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
};

module.exports = getConnection;