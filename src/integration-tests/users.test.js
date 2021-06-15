const chai = require('chai');
const sinon = require('sinon')
const chaiHttp = require('chai-http');
const { MongoClient, ObjectId } = require('mongodb');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');

const app = require('../api/app');
const getConnection = require('./getConnection');
const connection = require('../models/connection');
const secret = require('../data/secret');

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

describe('É possível criar um usuário adm no endpoint POST /users/admin', () => {
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

  describe('Se não houver token', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/users/admin')
        .send({
          name: "Teste",
          email: "teste@gmail.com",
          password: "12345678"
        })
        .then(({ body }) => body.message)
    })

    it('retorna um objeto contendo a mensagem de error', () => {
      console.log(response);
      expect(response).to.equal('missing auth token');
    })
  });

  describe('Se o token for inválido', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/users/admin')
        .set('Authorization', 'tokenInvalido')
        .send({
          name: "Teste",
          email: "teste@gmail.com",
          password: "12345678"
        })
        .then(({ body }) => body.message)
    })

    it('retorna um objeto contendo a mensagem de error', () => {
      expect(response).to.equal('jwt malformed');
    })
  })

  describe('Se o email já tiver sido cadastrado', () => {
    let response;

    beforeEach(async () => {
      const db = await conn.db('Cookmaster');

      const payloadUser = {
        _id: ObjectId(),
        name: "Teste",
        email: "teste@gmail.com",
        password: "12345678",
        role: 'admin'
      }

      const payloadUser2 = {
        _id: ObjectId(),
        name: "admin",
        email: "admin@gmail.com",
        password: "aiaiaiuiui",
        role: 'admin'
      }
      
      await db.collection('users').insertMany([ payloadUser, payloadUser2 ]);
      const { _id, email, role } = payloadUser;
      const token = jwt.sign({ _id, email, role }, secret);

      response = await chai.request(app)
        .post('/users/admin')
        .set('Authorization', token)
        .send({
          name: payloadUser2.name,
          email: payloadUser2.email,
          password: payloadUser2.password
        })
        .then(({ body }) => body.message)
    })

    it('retorna um objeto contendo a mensagem de error', () => {
      expect(response).to.equal('Email already registered');
    })
  })

  describe('Se o token existir, for válido e o email estiver disponível', () => {
    let response;

    beforeEach(async () => {
      const db = await conn.db('Cookmaster');

      const payloadUser = {
        _id: ObjectId(),
        name: "Teste",
        email: "teste@gmail.com",
        password: "12345678",
        role: 'admin'
      }

      await db.collection('users').insertOne(payloadUser);
      const { _id, email, role } = payloadUser;
      const token = jwt.sign({ _id, email, role }, secret);

      response = await chai.request(app)
        .post('/users/admin')
        .set('Authorization', token)
        .send({
          name: "admin",
          email: "admin@gmail.com",
          password: "aiaiaiuiui",
        })
        .then(({ body }) => body.user)
    })

    it('cadastra um usuário adimn', () => {
      expect(response).to.be.a('object');
      expect(response).to.have.all.keys(['_id', 'name', 'email', 'role'])
    })
  });
})
