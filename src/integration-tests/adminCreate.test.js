const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { expect } = require('chai');
const { getConnection } = require('./connectionsMock');

let connectionMock;

describe('POST /users/admin', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Quando não é passado o token JWT', () => {

    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/users/admin')
        .send({})
        .set('authorization', '');
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

    it('A propriedade "message" contém o valor "missing auth token"', () => {
      expect(response.body.message).to.be.equals('missing auth token');
    });
  });

  describe('Quando o token passado não é um JWT', () => {

    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/users/admin')
        .send({})
        .set('authorization', '999');
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

    it('A propriedade "message" contém o valor "jwt malformed"', () => {
      expect(response.body.message).to.be.equals('jwt malformed');
    });
  });

  describe('Quando o usuário não é admin', () => {

    let userLogin;
    let createAdmin;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'User Name',
        email: 'user@email.com',
        password: 'senha123',
        role: 'user',
      });

      userLogin = await chai.request(server)
        .post('/login')
        .send({
          email: 'user@email.com',
          password: 'senha123',
        });

      createAdmin = await chai.request(server)
        .post('/users/admin')
        .send({
          name: 'User Admin',
          email: 'emailAdmin@email.com',
          password: 'admin123',
        })
        .set('authorization', userLogin.body.token);
    });

    after(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      const recipeCollection = connectionMock.db('Cookmaster').collection('recipes')
      await usersCollection.deleteMany();
      await recipeCollection.deleteMany();
    });

    it('Retorna código de status "403"', () => {
      expect(createAdmin).to.have.status(403);
    });

    it('Retona um objeto no body', () => {
      expect(createAdmin.body).to.be.an('object');
    });

    it('Objeto retornado possui a propriedade "message"', () => {
      expect(createAdmin.body).to.have.property('message');
    });

    it('A propriedade "message" contém o valor "Email already registered"', () => {
      expect(createAdmin.body.message).to.be.equals('Only admins can register new admins');
    });
  });

  describe('Quando criado com sucesso o user-admin', () => {

    let loginAdmin;
    let createAdmin;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'User Admin',
        email: 'emailAdmin@email.com',
        password: 'admin123',
        role: 'admin',
      });

      loginAdmin = await chai.request(server)
        .post('/login')
        .send({
          email: 'emailAdmin@email.com',
          password: 'admin123',
        });

      createAdmin = await chai.request(server)
        .post('/users/admin')
        .send({
          name: 'User Admin New',
          email: 'emailAdminNew@email.com',
          password: 'admin123New',
        })
        .set('authorization', loginAdmin.body.token);
    });

    after(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      const recipeCollection = connectionMock.db('Cookmaster').collection('recipes')
      await usersCollection.deleteMany();
      await recipeCollection.deleteMany();
    });

    it('Retorna código de status "201"', () => {
      expect(createAdmin).to.have.status(201);
    });

    it('Retona um objeto no body', () => {
      expect(createAdmin.body).to.be.an('object');
    });

    it('Objeto retornado possui a propriedade "user"', () => {
      expect(createAdmin.body).to.have.property('user');
    });

    it('A propriedade "user" contém a propriedade "_id"', () => {
      expect(createAdmin.body.user).to.be.property('_id');
    });
  });
});