const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { expect } = require('chai');
const { getConnection } = require('./connectionsMock');

let connectionMock;

describe('POST /login', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Quando os dados inseridos são inválidos', () => {

    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({});
    });

    it('Retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Retona um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Objeto retornado possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('A propriedade "message" contém o valor "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('All fields must be filled');
    });
  });

  describe('Quando a senha do usuário não é igual ao cadastrado no banco', () => {

    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'User Name',
        email: 'user@email.com',
        password: 'senha123',
        role: 'user',
      });

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'user@email.com',
          password: 'senhaerrada',
        });
    });

    after(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany();
    });

    it('Retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Retona um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Objeto retornado possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('A propriedade "message" contém o valor "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });
  });

  describe('Quando o login é realizado com sucesso', () => {

    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'User Name',
        email: 'user@email.com',
        password: 'senha123',
        role: 'user',
      });

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'user@email.com',
          password: 'senha123',
        });
    });

    after(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany();
    });

    it('Retorna código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('Retona um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Objeto retornado possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });

    it('A propriedade "token" contém o token', () => {
      expect(response.body.token).to.be.not.empty;
    });
  });
});