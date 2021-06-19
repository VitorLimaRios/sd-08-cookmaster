const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient, ObjectId } = require('mongodb');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');

const app = require('../../api/app');
const getConnection = require('../getConnection');
const connection = require('../../models/connection');
const secret = require('../../data/secret');

chai.use(chaiHttp);

describe('É possível criar um usuário adm no endpoint POST /users/admin', () => {
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

  describe('Se não houver token', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/users/admin')
        .send({
          name: 'Teste',
          email: 'teste@gmail.com',
          password: '12345678'
        })
    });

    it('retorna um objeto contendo a mensagem de error', () => {
      const { body } = response;
      expect(body).to.be.a('object');
      expect(body).to.have.property('message');
      expect(body.message).to.equal('missing auth token');
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });
  });

  describe('Se o token for inválido', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/users/admin')
        .set('Authorization', 'tokenInvalido')
        .send({
          name: 'Teste',
          email: 'teste@gmail.com',
          password: '12345678'
        })
    });

    it('retorna um objeto contendo a mensagem de error', () => {
      expect(response.body.message).to.equal('jwt malformed');
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });
  });

  describe('Se o email já tiver sido cadastrado', () => {
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

      const payloadUser2 = {
        _id: ObjectId(),
        name: 'admin',
        email: 'admin@gmail.com',
        password: 'aiaiaiuiui',
        role: 'admin'
      };
      
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
    });

    it('retorna um objeto contendo a mensagem de error', () => {
      expect(response.body.message).to.equal('Email already registered');
    });

    it('retorna status 409', () => {
      expect(response).to.have.status(409);
    });
  });

  describe('Se o token existir, for válido e o email estiver disponível', () => {
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
      const { _id, email, role } = payloadUser;
      const token = jwt.sign({ _id, email, role }, secret);

      response = await chai.request(app)
        .post('/users/admin')
        .set('Authorization', token)
        .send({
          name: 'admin',
          email: 'admin@gmail.com',
          password: 'aiaiaiuiui',
        })
    });

    it('retorna um objeto com os dados do usuário admin cadastrado', () => {
      expect(response.body.user).to.have.all.keys(['_id', 'name', 'email', 'role']);
      expect(response.body.user.role).to.equal('admin');
    });

    it('retorna status 201', () => {
      expect(response).to.have.status(201);
    });
  });

  describe('Somente admins podem criar outros admins', () => {
    let response;

    beforeEach(async () => {
      const db = await conn.db('Cookmaster');

      const payloadUser = {
        _id: ObjectId(),
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '12345678',
        role: 'user'
      };

      await db.collection('users').insertOne(payloadUser);
      const { _id, email, role } = payloadUser;
      const token = jwt.sign({ _id, email, role }, secret);

      response = await chai.request(app)
        .post('/users/admin')
        .set('Authorization', token)
        .send({
          name: 'admin',
          email: 'admin@gmail.com',
          password: 'aiaiaiuiui',
        })
    });

    it('retorna um objeto com a mensagem de erro', () => {
      expect(response.body.message).to.equal('Only admins can register new admins');
    });

    it('retorna status 403', () => {
      expect(response).to.have.status(403);
    });
  });
});
