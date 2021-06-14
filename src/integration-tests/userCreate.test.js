const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { expect } = require('chai');
const { getConnection } = require('./connectionsMock');

let connectionMock;

describe('POST /users', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Quando os dados para criar usuário estão incorretos', () => {

    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({});
    });

    it('Retorna código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('Retona um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Objeto retornado possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('A propriedade "message" contém o valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('Quando o email passado já existe no banco', () => {
    let response;
    
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'User Name',
        email: 'email@email.com',
        password: 'senha123',
        role: 'user',
      });

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'User Name',
          email: 'email@email.com',
          password: 'senha123',
        });
    });

    after(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany();
    });

    it('Retorna código de status "409"', () => {
      expect(response).to.have.status(409);
    });

    it('Retona um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Objeto retornado possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('A propriedade "message" contém o valor "Email already registered"', () => {
      expect(response.body.message).to.be.equals('Email already registered');
    });
  });

  describe('Quando o usuário é criado com sucesso', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'User Name',
          email: 'email@email.com',
          password: 'senha123',
        });
    });

    it('Retorna código de status "201"', () => {
      expect(response).to.have.status(201);
    });

    it('Retona um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Objeto retornado possui a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('O objeto "user" contém a propriedade "_id"', () => {
      expect(response.body.user).to.be.property('_id');
    });
  });

});
