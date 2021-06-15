const app = require('../api/app');
const sinon = require('sinon')
const chai = require('chai');

const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const { expect } = require('chai');

const chaiHttp = require('chai-http');

const user = {
  name: 'rodrigo',
  email: 'rdesouza@gmail.com',
  password: '123321'
}

const login = {
  email: 'rdesouza@gmail.com',
  password: '123321'
}

const recipe = {
  name: 'strogonoff',
  ingredients: 'frango',
  preparation: 'pega e faz'
}

chai.use(chaiHttp);

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

describe('É possivel criar uma receita', () => {
  describe('quando o usuário está validado', () => {
    let response;

    before(async () => {
      await chai.request(app)
      .post('/users')
      .send(user);

      const token = await chai.request(app)
      .post('/login')
      .send(login)
      .then((res) => res.body.token);

      response = await chai.request(app)
      .post('/recipes')
      .set('Authorization', token)
      .send(recipe)
      .then((res) => res.body)
    });

    it('Retorna um objeto', () => {
      expect(response).to.be.an('object')
    })

    it('espera que tenha a prorpiedade recipe', () => {
      expect(response).to.have.property('recipe')
    })
  })

  describe('quando o usuário não está validado', () => {
    let response;
    before(async() => {
      response = await chai.request(app)
      .post('/recipes')
      .send(recipe)
      .then((res) => res.body)
    })

    it('Retorna um objeto', () => {
      expect(response).to.be.an('object')
    })

    it('espera que tenha a prorpiedade recipe', () => {
      expect(response).to.have.property('message')
    })

    it('retorna a menssagem correta', () => {
      expect(response.message).to.equal('missing auth token');
    })
  });

  describe('quando não passa todas as informações necessárias', () => {
    let response;
    
    before(async() => {
      await chai.request(app)
      .post('/users')
      .send(user);

      const token = await chai.request(app)
      .post('/login')
      .send(login)
      .then((res) => res.body.token);

      response = await chai.request(app)
      .post('/recipes')
      .set('Authorization', token)
      .send({
        name: 'strogonoff',
        ingredients: 'frango'
      })
      .then((res) => res.body)
    });

    it('retorna um objeto', () => {
      expect(response).to.be.an('object');
    })

    it('retorne uma mensagem de erro', () => {
      expect(response).to.have.property('message')

      expect(response.message).to.be.equal('Invalid entries. Try again.')
    })
  })
})

