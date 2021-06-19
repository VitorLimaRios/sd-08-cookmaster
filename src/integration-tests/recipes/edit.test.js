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

describe('É possível editar uma receita em PUT /recipes/:id', () => {
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
        .put(`/recipes/${recipeId}`)
        .send({
          name: 'Nome alterado',
          ingredients: 'Frango, sazon',
          preparation: '10 minutos no forno',
        })
    });

    it('retorna um objeto com a mensagem de error', () => {
      expect(response.body.message).to.equal('missing auth token');
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });
  });

  describe('Quando o token enviado for inválido', () => {
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
      
      const invalidToken = jwt.sign({}, secret);

      response = await chai.request(app)
        .put(`/recipes/${recipeId}`)
        .set('Authorization', invalidToken)
        .send({
          name: 'Nome alterado',
          ingredients: 'Frango, sazon',
          preparation: '10 minutos no forno',
        })
    });

    it('retorna um objeto com a mensagem de error', () => {
      expect(response.body.message).to.equal('Acesso negado');
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });
  });

  describe('Não é possível editar e receita de outro usuário sem ser admin', () => {
    let response;

    beforeEach(async () => {
      const recipeId = ObjectId();

      const payloadUser = {
        _id: ObjectId(),
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
        .put(`/recipes/${recipeId}`)
        .set('Authorization', token)
        .send({
          name: 'Receita editada',
          ingredients: 'Frango, sazon',
          preparation: '10 minutos no forno'
        })
    });

    it('retorna um objeto com a mensagem de error', () => {
      expect(response.body.message).to.equal('Acesso negado');
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });
  });

  describe('É possível editar a receita de outro usuário se você for admin', () => {
    let response;

    beforeEach(async () => {
      const recipeId = ObjectId();

      const payloadUser = {
        _id: ObjectId(),
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '12345678',
        role: 'admin'
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
        .put(`/recipes/${recipeId}`)
        .set('Authorization', token)
        .send({
          name: 'Receita editada',
          ingredients: 'Frango, sazon',
          preparation: '10 minutos no forno'
        })
    });

    it('retorna um objeto com a receita editada', () => {
      expect(response.body).to.be.have.all.keys([
        '_id', 'name', 'ingredients', 'preparation', 'userId', 'image'
      ]);
      expect(response.body.name).to.equal('Receita editada');
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });
  });

  describe('É possível editar receitas que pertencem àquele usuário', () => {
    let response;

    beforeEach(async () => {
      const recipeId = ObjectId();
      const userId = ObjectId();

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
        .put(`/recipes/${recipeId}`)
        .set('Authorization', token)
        .send({
          name: 'Receita editada',
          ingredients: 'Frango, sazon',
          preparation: '10 minutos no forno'
        })
    });

    it('retorna um objeto com a receita editada', () => {
      expect(response.body).to.be.have.all.keys([
        '_id', 'name', 'ingredients', 'preparation', 'userId', 'image'
      ]);
      expect(response.body.name).to.equal('Receita editada');
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });
  });

  describe('Quando não houver receita com aquele id', () => {
    let response;

    beforeEach(async () => {
      const userId = ObjectId();

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
        .put(`/recipes/${ObjectId()}`)
        .set('Authorization', token)
        .send({
          name: 'Receita editada',
          ingredients: 'Frango, sazon',
          preparation: '10 minutos no forno'
        })
    });

    it('retorna um objeto com a mensagem de error', () => {
      expect(response.body.message).to.equal('Recipe not found');
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });
  });
});
