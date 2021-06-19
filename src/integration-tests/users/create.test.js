const chai = require('chai');
const sinon = require('sinon')
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
  })

  beforeEach(async () => {
    const db = conn.db('Cookmaster');
    await db.collection('users').deleteMany({});
  })

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
          name: "Teste",
          email: "teste@gmail.com",
          password: "12345678"
        })
        .then(({ body }) => body.user)
    })

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
      expect(response).to.have.property('role');
      expect(response.role).to.equal('user');
    })
  })

  describe('Não é possível criar um usuário com um email já cadastrado', () => {
    let response;

    beforeEach(async () => {
      const db = await conn.db('Cookmaster');
      await db.collection('users').insertOne({
        _id: ObjectId(),
        name: "Teste",
        email: "teste@gmail.com",
        password: "12345678",
        role: 'user'
      })

      response = await chai.request(app)
        .post('/users')
        .send({
          name: "Teste",
          email: "teste@gmail.com",
          password: "12345678"
        })
        .then(({ body }) => body.message)
    })

    it('retorna um objeto', () => {
      expect(response).to.equal('Email already registered');
    })
  })
})
