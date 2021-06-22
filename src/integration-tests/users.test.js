const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /users', () => {
  describe('quando é criado com sucesso', () => {
    const payload = { 
      name: 'Fake Name',
      email: 'fakemail@gmail.com',
      password: 'senha123'
    };

    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send(payload);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });
  });
});

describe('POST /login', () => {
  describe('quando o login é efetuado com sucesso', () => {
    const userData = { 
      name: 'Fake Name',
      email: 'fakemail@gmail.com',
      password: 'senha123'
    };
    
    const payload = { 
      email: 'fakemail@gmail.com',
      password: 'senha123'
    };

    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne(userData);

      response = await chai.request(server)
        .post('/login')
        .send(payload);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.a('object');
    });

    it('objeto de resposta possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
  });
});
