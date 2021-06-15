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

describe('É possível criar uma receita', () => {
  describe('Quando for criada com sucesso', () => {
    let response;

    before(async () => {
      await chai.request(app)
        .post('/users')
        .send({
          name: "Teste",
          email: "teste@gmail.com",
          password: "12345678"
        });

      const token = await chai.request(app)
        .post('/login')
        .send({
          email: "teste@gmail.com",
          password: "12345678"
        })
        .then(({ body }) => body.token);
      
      response = await chai.request(app)
        .post('/recipes')
        .set('Authorization', token)
        .send({
          name: "Frango",
          ingredients: "Frango, sazon",
          preparation: "10 minutos no forno"
        })
        .then(({ body }) => body);
    })

    it('Retorna um objeto', () => {
      expect(response).to.be.a('object');
    })
  })

  describe('Ao tentar criar a receita sem o token', () => {
    let response;

    before(async () => {
      response = await chai.request(app)
        .post('/recipes')
        .send({
          name: "Frango",
          ingredients: "Frango, sazon",
          preparation: "10 minutos no forno"
        })
        .then(({ body }) => body.message);
    })

    it('Retorna uma mensagem de error', () => {
      expect(response).to.equal('missing auth token');
    })
  });
});
