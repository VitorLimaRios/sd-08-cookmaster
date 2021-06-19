const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient, ObjectId } = require('mongodb');
const { expect } = require('chai');

const app = require('../../api/app');
const getConnection = require('../getConnection');
const connection = require('../../models/connection');

chai.use(chaiHttp);

describe('É possível criar um usuário comum no endpoint POST /users', () => {
  let conn;

  before(async () => {
    conn = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(conn);
  });

  beforeEach(async () => {
    const db = conn.db('Cookmaster');
    await db.collection('users').deleteMany({});
  });

  after(() => {
    connection.close();
    MongoClient.connect.restore();
  });

  describe('Se o usuário for criado com sucesso', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/users')
        .send({
          name: 'Teste',
          email: 'teste@gmail.com',
          password: '12345678'
        })
    });

    it('retorna um objeto', () => {
      expect(response.body.user).to.have.all.keys(['_id', 'name', 'email', 'role']);
      expect(response.body.user.role).to.equal('user');
    });

    it('retorna status 201', () => {
      expect(response).to.have.status(201);
    });
  });

  describe('Se o não houver o campo name', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/users')
        .send({
          email: 'teste@gmail.com',
          password: '12345678'
        })
    });

    it('retorna um objeto com uma mensagem de error', () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });
  });

  describe('Se o não houver o campo email', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/users')
        .send({
          name: 'Teste',
          password: '12345678'
        })
    });

    it('retorna um objeto com uma mensagem de error', () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });
  });

  describe('Se o não houver o campo password', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/users')
        .send({
          name: 'Teste',
          email: 'teste@gmail.com',
        })
    });

    it('retorna um objeto com uma mensagem de error', () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });
  });

  describe('Se o email for inválido', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/users')
        .send({
          name: 'Teste',
          email: 'emailInválido',
          password: '12345678'
        })
    });

    it('retorna um objeto com uma mensagem de error', () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });
  });

  describe('Não é possível criar um usuário com um email já cadastrado', () => {
    let response;

    beforeEach(async () => {
      const db = await conn.db('Cookmaster');
      await db.collection('users').insertOne({
        _id: ObjectId(),
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '12345678',
        role: 'user'
      });

      response = await chai.request(app)
        .post('/users')
        .send({
          name: 'Teste',
          email: 'teste@gmail.com',
          password: '12345678'
        })
        .then((res) => res);
    });

    it('retorna um objeto', () => {
      expect(response.body.message).to.equal('Email already registered');
    });

    it('retorna status 409', () => {
      expect(response).to.have.status(409);
    });
  });
});
