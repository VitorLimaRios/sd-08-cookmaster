const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient, ObjectId } = require('mongodb');
const { expect } = require('chai');

const app = require('../api/app');
const getConnection = require('./getConnection');
const connection = require('../models/connection');

chai.use(chaiHttp);

describe('É possível fazer login em POST /login', () => {
  let conn;

  before(async () => {
    conn = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(conn);
  });

  beforeEach(async () => {
    const db = await conn.db('Cookmaster');
    await db.collection('users').deleteMany({});
  });

  after(() => {
    connection.close();
    MongoClient.connect.restore();
  });

  describe('Quando o email for inválido', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/login')
        .send({
          email: 'emailInválido',
          password: '12345678'
        })
    });

    it('Retorna um objeto com a mensagem de error', () => {
      expect(response.body.message).to.equal('Incorrect username or password');
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });
  });

  describe('Quando o password for inválido', () => {
    let response;

    beforeEach(async () => {
      const db = await conn.db('Cookmaster');

      const payloadUser = {
        _id: ObjectId(),
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '12345678',
        role: 'admin'
      };

      await db.collection('users').insertOne(payloadUser);

      response = await chai.request(app)
        .post('/login')
        .send({
          email: 'teste@gmail.com',
          password: 'senhaErrada'
        })
    });

    it('Retorna um objeto com a mensagem de error', () => {
      expect(response.body.message).to.equal('Incorrect username or password');
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });
  });

  describe('Quando o login for efetuado com sucesso', () => {
    let response;

    beforeEach(async () => {
      const db = await conn.db('Cookmaster');

      const payloadUser = {
        _id: ObjectId(),
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '12345678',
        role: 'admin'
      };

      await db.collection('users').insertOne(payloadUser);

      response = await chai.request(app)
        .post('/login')
        .send({
          email: 'teste@gmail.com',
          password: '12345678'
        })
    });

    it('Retorna um objeto contendo o token', () => {
      expect(response.body).to.have.property('token');
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });
  });
});
