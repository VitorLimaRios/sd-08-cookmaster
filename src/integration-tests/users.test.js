const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const server = require('../api/app');
const connectionMock = require('./connectionMock');

chai.use(chaiHttp);
const { expect } = chai;

let mockedConnection = null;

describe('API de usuários', () => {
  before(async () => {
    mockedConnection = await connectionMock();
    sinon.stub(MongoClient, 'connect').resolves(mockedConnection); 
  })

  beforeEach(async () => {
    const db = mockedConnection.db('Cookmaster').collection('users');
    await db.deleteMany({});
  })

  after(() => {
    MongoClient.connect.restore()
  })

  describe('POST /users', () => {
    
    describe('Quando passa os dados válidos', () => {
      let response;
      
      before(async () => {

        response = await chai.request(server)
          .post('/users')
          .send({
            "name": "Fake User",
            "email": "fake11232@email.com",
            "password": "123123"
          });
      })

      it('retorna o código de status 201', () => {
        expect(response).to.have.status(201);
      })

      it('retorna um objeto no body com a propriedade "user"', () => {
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.key('user');
      })

      it(`a propriedade "user" é um objeto que contém os dados do usuário adicionado,
        sem o password, com o "_id" e "role"`, () => {
        expect(response.body.user).to.be.an('object');
        expect(response.body.user).to.have.all.keys('name', 'email', '_id', 'role');
        expect(response.body.user.name).to.be.equals('Fake User');
        expect(response.body.user.email).to.be.equals('fake11232@email.com');
      })

    });


    describe('Quando não passa os dados válidos', () => {
      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({});
      })
      it('retorna código de status 400', () => {
        expect(response).to.have.status(400);
      })
      it('retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      })
      it('o objeto contém a propriedade "message"', () => {
        expect(response.body).to.have.key("message");
      })

      it('a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equals('Invalid entries. Try again.');
      })
    });

  })

  describe('POST /login', () => {
    describe('Quando passa dados válidos', () => {
      let response;
      
      before(async () => {
        const db = mockedConnection.db('Cookmaster').collection('users');
        await db.insertOne({
          "name": "Fake User",
          "email": "fake11232@email.com",
          "password": "123123"
        })

        response = await chai.request(server)
          .post('/login')
          .send({
            "email": "fake11232@email.com",
            "password": "123123"
          });
      })

      it('retorna código de status "200"', () => {
        expect(response).to.have.status(200);
      })

      it('retorna o token de autenticação', () => {
        expect(response.body).to.have.key('token');
      })

    })

    describe('Quando não passa todos os campos necessários', () => {
      let response;
      
      before(async () => {
        const db = mockedConnection.db('Cookmaster').collection('users');
        await db.deleteMany({});
        await db.insertOne({
          "name": "Fake User",
          "email": "fake11232@email.com",
          "password": "123123"
        })

        response = await chai.request(server)
          .post('/login')
          .send({
            "email": "fake11232@email.com",
          });
      })

      it('retorna código de status "401"', () => {
        expect(response).to.have.status(401)
      })

      it('retorna um objeto no body com a propriedade "message"', () => {
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.key('message');
      })

    })

    describe('Quando o login é feito com sucesso', () => {
      let response;
      before(async () => {
        const db = mockedConnection.db('Cookmaster').collection('users');
        await db.deleteMany({});
        await db.insertOne({
          "name": "Fake User",
          "email": "fake11232@email.com",
          "password": "123123"
        })

        response = await chai.request(server)
          .post('/login')
          .send({
            "email": "fake11232@email.com",
            "password": "123123"
          });
      })
      
      it('retorna o código de status "200"', () => {
        expect(response).to.have.status(200);
      })

      it('retorna um objeto no body com a propriedade "token"', () => {
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.key('token');
      })

    })
  })

  
});
