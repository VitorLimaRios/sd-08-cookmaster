const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon')
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const app = require('../api/app');
const { expect } = require('chai');

chai.use(chaiHttp);

before(async () => {
  const mongodb = new MongoMemoryServer();
  const uri = await mongodb.getUri();

  const conn = MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  sinon.stub(MongoClient, 'connect').resolves(conn);
})

after(() => MongoClient.connect.restore());

describe('É possível criar um usuário comum', () => {

  describe('Quando for criado com sucesso', () => {
    let response;

    before(async () => {
      response = await chai.request(app)
        .post('/')
        .send({
          name: "Teste",
          email: "teste@gmail.com",
          password: "12345678"
        })
        .then(({ body }) => body)
    })

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    })
  })

  describe('Não é possível criar um usuário com um email já cadastrado', () => {
    let response;

    before(async () => {
      await chai.request(app)
        .post('/users')
        .send({
          name: "Teste",
          email: "teste@gmail.com",
          password: "12345678"
        });

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
});