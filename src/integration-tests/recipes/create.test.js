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

describe('É possível criar uma receita no endpoint POST /recipes', () => {
  let conn;

  before(async () => {
    conn = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(conn);
  });

  beforeEach(async () => {
    const db = await conn.db('Cookmaster');
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
  });

  after(() => {
    connection.close();
    MongoClient.connect.restore();
  });

  describe('Quando não houver um token', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/recipes')
        .send({
          name: 'Frango',
          ingredients: 'Frango, sazon',
          preparation: '10 minutos no forno'
        })
        .then((response) => response);
    });

    it('Retorna um objeto com a mensagem de error', () => {
      expect(response.body.message).to.equal('missing auth token');
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });
  });

  describe('Quando o token for inválido', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/recipes')
        .set('Authorization', 'invalidToken')
        .send({
          name: 'Frango',
          ingredients: 'Frango, sazon',
          preparation: '10 minutos no forno'
        })
        .then((response) => response);
    });

    it('Retorna um objeto com a mensagem de error', () => {
      expect(response.body.message).to.equal('jwt malformed');
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });
  });

  describe('Quando for criada com sucesso', () => {
    let response, userId;

    beforeEach(async () => {
      userId = ObjectId();

      const payloadUser = {
        _id: userId,
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '12345678',
        role: 'user'
      };

      const db = await conn.db('Cookmaster');
      await db.collection('users').insertOne(payloadUser);

      const { _id, email, role } = payloadUser;
      const token = jwt.sign({ id: _id, email, role }, secret);
 
      response = await chai.request(app)
        .post('/recipes')
        .set('Authorization', token)
        .send({
          name: 'Frango',
          ingredients: 'Frango, sazon',
          preparation: '10 minutos no forno'
        })
        .then((response) => response);
    });

    it('Deverá retornar um objeto com a receita criada', () => {
      expect(response.body.recipe).to.be.a('object');
      expect(response.body.recipe).to.have.all.keys([
        '_id', 'name', 'ingredients', 'preparation', 'userId'
      ]);
    });

    it('Deverá ter o userId do usuário que a criou', () => {
      expect(response.body.recipe).to.have.property('userId');
      expect(response.body.recipe.userId).to.equal(userId.toString());
    });

    it('retorna status 201', () => {
      expect(response).to.have.status(201);
    });
  });
});
