const app = require('../api/app');
const sinon = require('sinon')
const chai = require('chai');

const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const { expect } = require('chai');

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const user = {
  name: 'rodrigo',
  email: 'rdesouza@gmail.com',
  password: '123321'
}

before(async () => {
  const mongodb = new MongoMemoryServer();
  const uri = await mongodb.getUri();

  const conn = MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  sinon.stub(MongoClient, 'connect').resolves(conn)
});

after(() => {
  MongoClient.connect.restore();
})

describe('É possível cadastrar um usuário', () => {
  describe('quando o usuário é criado com sucesso', () => {
    let response;

    before(async () => {
      response = await chai.request(app)
        .post('/users')
        .send(user)
        .then((req) => req.body)
    });

    it('retorna um objeto', () => {
      expect(response).to.be.an('object');
    });

    it('retorna encapsulado em "user"', () => {
      expect(response).to.have.property('user');
    });

    it('tem as propriedades "name" e "email" correspondentes', () => {
      expect(response.user).to.have.property('name')
      expect(response.user).to.have.property('email')

      expect(response.user.name).to.be.equal('rodrigo')
      expect(response.user.email).to.be.equal('rdesouza@gmail.com')
    });

  });

  describe('quando o usuário já existe', () => {
    let response;

    before(async() => {
      await chai.request(app)
      .post('/users')
      .send(user);

    response = await chai.request(app)
      .post('/users')
      .send(user)
      .then((req) => req.body)
    });

    it('retorna um objeto', () => {
      expect(response).to.be.an('object');
    });

    it('informa que o e-mail já está registrado', () => {
      expect(response.message).to.be.equal('Email already registered')
    })
  })
})