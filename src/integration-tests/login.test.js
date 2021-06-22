const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../api/app');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);
const { expect } = chai;

let connectionMock;

describe('POST /login', () => {

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('1 - Quando não é passado usuário e senha', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({});
    });

    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('All fields must be filled');
    });
  });

  describe('2 - Usuário não existe ou senha inválida', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'user-fake2',
          password: 'senha-fake2'
        });
    })

    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });

  });
  
  describe('3 - Quando login é feito com sucesso', () => {

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany({});
      await usersCollection.insertOne({
        email: 'erickjacquin@gmail.com',
        password: '12345678',
      })

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'erickjacquin@gmail.com',
          password: '12345678',
        });
    });

    it('retorna código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });

    it('a propriedade "token" não pode ser vazia', () => {
      expect(response.body.message).to.be.not.empty;
    });

  });
})
