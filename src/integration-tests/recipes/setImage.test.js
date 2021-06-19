const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient, ObjectId } = require('mongodb');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const secret = require('../../data/secret');

const app = require('../../api/app');
const getConnection = require('../getConnection');
const connection = require('../../models/connection');

chai.use(chaiHttp);

describe('É possível adicionar uma imagem para a receita PUT /recipes/:id/image', () => {
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
        userId: ObjectId(),
        image: undefined
      };

      const db = await conn.db('Cookmaster');
      await db.collection('recipes').insertOne(payloadRecipe);
      
      response = await chai.request(app)
        .put(`/recipes/${recipeId}/image`)
        .attach('image', fs.readFileSync(path.join(__dirname, 'imageMock.jpg')), 'imageMock.jpg')
        .then((response) => response);
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
        userId: ObjectId(),
        image: undefined
      };

      const db = await conn.db('Cookmaster');
      await db.collection('recipes').insertOne(payloadRecipe);
      
      response = await chai.request(app)
        .put(`/recipes/${recipeId}/image`)
        .set('Authorization', 'invalidToken')
        .attach('image', fs.readFileSync(path.join(__dirname, 'imageMock.jpg')), 'imageMock.jpg')
        .then((response) => response);
    });
    
    it('retorna um objeto com a mensagem de error', () => {
      expect(response.body.message).to.equal('jwt malformed');
    });
    
    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });
  });

  describe('É possível alterar a imagem de uma receita se ela pertencer àquele usuário', () => {
    let response, recipeId;
  
    beforeEach(async () => {
      const userId = ObjectId();
      recipeId = ObjectId();
  
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
        userId,
        image: undefined
      };
  
      const db = await conn.db('Cookmaster');
      await db.collection('recipes').insertOne(payloadRecipe);
      await db.collection('users').insertOne(payloadUser);
  
      const { _id: id, email, role } = payloadUser;
      const token = jwt.sign({ id, email, role }, secret);
  
      response = await chai.request(app)
        .put(`/recipes/${recipeId}/image`)
        .set('Authorization', token)
        .attach('image', fs.readFileSync(path.join(__dirname, 'imageMock.jpg')), 'imageMock.jpg');
    });
  
    it('retorna um objeto com a receita tendo a imagem alterada', () => {
      expect(response.body).to.have.all.keys([
        '_id', 'name', 'ingredients', 'preparation', 'userId', 'image'
      ]);
      expect(response.body.image).to.equal(`localhost:3000/src/uploads/${recipeId}.jpeg`);
    });
  
    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });
  });

  describe('Não é possível alterar a imagem de uma receita de outro usuário sem ser admin', () => {
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
        userId: ObjectId(),
        image: undefined
      };
      
      const db = await conn.db('Cookmaster');
      await db.collection('recipes').insertOne(payloadRecipe);
      await db.collection('users').insertOne(payloadUser);
      
      const { _id: id, email, role } = payloadUser;
      const token = jwt.sign({ id, email, role }, secret);
      
      response = await chai.request(app)
        .put(`/recipes/${recipeId}/image`)
        .set('Authorization', token)
        .attach('image', fs.readFileSync(path.join(__dirname, 'imageMock.jpg')), 'imageMock.jpg')
        .then((response) => response);
    });
    
    it('retorna um objeto com a mensagem de error', () => {
      expect(response.body.message).to.equal('Acesso negado');
    });
    
    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });
  });
  
  describe('É possível alterar a imagem de uma receita de outro usuário se você for admin', () => {
    let response, recipeId;
    
    beforeEach(async () => {
      const userId = ObjectId();
      recipeId = ObjectId();
      
      const payloadUser = {
        _id: userId,
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
        userId: ObjectId(),
        image: undefined
      };
      
      const db = await conn.db('Cookmaster');
      await db.collection('recipes').insertOne(payloadRecipe);
      await db.collection('users').insertOne(payloadUser);
      
      const { _id: id, email, role } = payloadUser;
      const token = jwt.sign({ id, email, role }, secret);
      
      response = await chai.request(app)
        .put(`/recipes/${recipeId}/image`)
        .set('Authorization', token)
        .attach('image', fs.readFileSync(path.join(__dirname, 'imageMock.jpg')), 'imageMock.jpg')
        .then((response) => response);
    });
    
    it('retorna um objeto com a receita tendo a imagem alterada', () => {
      expect(response.body).to.have.all.keys([
        '_id', 'name', 'ingredients', 'preparation', 'userId', 'image'
      ]);
      expect(response.body.image).to.equal(`localhost:3000/src/uploads/${recipeId}.jpeg`);
    });
    
    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });
  });

  describe('Quando não existir uma receita com o Id', () => {
    let response;
    
    beforeEach(async () => {      
      const payloadUser = {
        _id: ObjectId(),
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '12345678',
        role: 'admin',
        image: undefined
      };
            
      const db = await conn.db('Cookmaster');
      await db.collection('users').insertOne(payloadUser);
      
      const { _id: id, email, role } = payloadUser;
      const token = jwt.sign({ id, email, role }, secret);
      
      response = await chai.request(app)
        .put(`/recipes/${ObjectId()}/image`)
        .set('Authorization', token)
        .attach('image', fs.readFileSync(path.join(__dirname, 'imageMock.jpg')), 'imageMock.jpg')
        .then((response) => response);
    });
    
    it('retorna um objeto com a mensagem de error', () => {
      expect(response.body.message).to.equal('Recipe not found');
    });
    
    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });
  });
});
