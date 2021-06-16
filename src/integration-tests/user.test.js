const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);

const server = require('../api/app');
const { getConnection } = require('./connectionMock');
const { expect } = require('chai');

let connectionMock;

describe('POST /users', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async() => {
    MongoClient.connect.restore();
  });

  describe('Quando é passado nome, email e senha corretamente', () => {
    let response;
    
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'string',
          email: 'string@string.com',
          password: '123'
        });
    });

    it('retorna o status 201 e um objeto com a propriedade "user"', () => {
      expect(response).to.have.status(201);
      expect(response.body).to.have.have.a.property('user');
    });
  });
});

describe('POST /login', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async() => {
    MongoClient.connect.restore();
  });

  describe('Quando o login é efetuado com sucesso', () => {
    let response;

    before(async () => {
      const DB_NAME = 'Cookmaster';
      const usersCollection = connectionMock.db(DB_NAME).collection('users');
      await usersCollection.insertOne({
        name: 'string',
        email: 'string@string.com',
        password: '123'
      });

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'string@string.com',
          password: '123'
        });
    });

    it('retorna o status 200 e um objeto com a propriedade "token"', () => {
      expect(response).to.have.status(200);
      expect(response.body).to.have.have.a.property('token');
    });
  });
});
