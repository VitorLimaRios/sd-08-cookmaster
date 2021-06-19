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

describe('É possível remover uma receita em DELETE /recipes/:id', () => {
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
    MongoClient.connect.restore();
    connection.close();
  });


  describe('Quando não for enviado o token', () => {
    let response;

    beforeEach(async () => {
      const recipeId = ObjectId();

      const payloadRecipe = {
        _id: recipeId,
        name: 'Frango',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos no forno',
        userId: ObjectId()
      };

      const db = await conn.db('Cookmaster');
      await db.collection('recipes').insertOne(payloadRecipe);
      
      response = await chai.request(app)
        .delete(`/recipes/${recipeId}`)
        .send()
        .then((response) => response);
    });

    it('retorna um objeto com a mensagem de error', () => {
      expect(response.body.message).to.equal('missing auth token');
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });
  });

  describe('Quando a receita for removida com sucesso', () => {
    let response;

    beforeEach(async () => {
      const userId = ObjectId();
      const recipeId = ObjectId();

      const payloadUser = {
        _id: userId,
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '12345678',
        role: 'user'
      };

      const payloadRecipe = {
        _id: recipeId,
        name: 'Frango',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos no forno',
        userId: userId
      };

      const db = await conn.db('Cookmaster');
      await db.collection('recipes').insertOne(payloadRecipe);
      await db.collection('users').insertOne(payloadUser);

      const { _id, email, role } = payloadUser;
      const token = jwt.sign({ id: _id, email, role }, secret);

      response = await chai.request(app)
        .delete(`/recipes/${recipeId}`)
        .set('Authorization', token)
        .send()
        .then((recipe) => recipe);
    });

    it('retorna um objeto vazio', () => {
      expect(response.body).to.be.empty;
    });

    it('retorna status 204', () => {
      expect(response).to.have.status(204);
    });
  });

  describe('Quando não houver nenhuma receita com o id', () => {
    let response;

    beforeEach(async () => {
      const payloadUser = {
        _id: ObjectId(),
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
        .delete(`/recipes/${ObjectId()}`)
        .set('Authorization', token)
        .send()
        .then((response) => response);
    });

    it('retorna um objeto com a mensagem de error', () => {
      expect(response.body.message).to.equal('Recipe not found');
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });
  });

  describe('Não é possível remover a receita de outro usuário sem ser admin', () => {
    let response;

    beforeEach(async () => {
      const userId = ObjectId();
      const recipeId = ObjectId();

      const payloadUser = {
        _id: userId,
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '12345678',
        role: 'user'
      };

      const payloadRecipe = {
        _id: recipeId,
        name: 'Frango',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos no forno',
        userId: ObjectId()
      };

      const db = await conn.db('Cookmaster');
      await db.collection('recipes').insertOne(payloadRecipe);
      await db.collection('users').insertOne(payloadUser);

      const { _id, email, role } = payloadUser;
      const token = jwt.sign({ id: _id, email, role }, secret);

      response = await chai.request(app)
        .delete(`/recipes/${recipeId}`)
        .set('Authorization', token)
        .send()
        .then((response) => response);
    });

    it('retorna um objeto com a mensagem de error', () => {
      expect(response.body.message).to.equal('Forbidden');
    });

    it('retorna status 403', () => {
      expect(response).to.have.status(403);
    });
  });
});
