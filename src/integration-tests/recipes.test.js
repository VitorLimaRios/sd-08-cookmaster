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

describe('É possível criar uma receita no endpoint POST /recipes', () => {
  let conn;

  before(async () => {
    conn = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(conn);
  })

  beforeEach(async () => {
    const db = await conn.db('Cookmaster');
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
  })

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
          name: "Frango",
          ingredients: "Frango, sazon",
          preparation: "10 minutos no forno"
        })
        .then(({ body }) => body);
    })

    it('Retorna um objeto com a mensagem de error', () => {
      expect(response).to.be.a('object');
      expect(response).to.have.property('message');
      expect(response.message).to.equal('missing auth token');
    })
  })

  describe('Quando o token for inválido', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/recipes')
        .set('Authorization', 'invalidToken')
        .send({
          name: "Frango",
          ingredients: "Frango, sazon",
          preparation: "10 minutos no forno"
        })
        .then(({ body }) => body);
    })

    it('Retorna um objeto com a mensagem de error', () => {
      expect(response).to.be.a('object');
      expect(response).to.have.property('message');
      expect(response.message).to.equal('jwt malformed');
    })
  })

  describe('Quando for criada com sucesso', () => {
    let response, userId;

    beforeEach(async () => {
      userId = ObjectId();

      const payloadUser = {
        _id: userId,
        name: "Teste",
        email: "teste@gmail.com",
        password: "12345678",
        role: "user"
      }

      const db = await conn.db('Cookmaster');
      await db.collection('users').insertOne(payloadUser);

      const { _id, email, role } = payloadUser;
      const token = jwt.sign({ id: _id, email, role }, secret);
 
      response = await chai.request(app)
        .post('/recipes')
        .set('Authorization', token)
        .send({
          name: "Frango",
          ingredients: "Frango, sazon",
          preparation: "10 minutos no forno"
        })
        .then(({ body }) => body.recipe);
    })

    it('Deverá retornar um objeto com a receita criada', () => {
      expect(response).to.be.a('object');
      expect(response).to.have.all.keys([
        '_id', 'name', 'ingredients', 'preparation', 'userId'
      ]);
    })

    it('Deverá ter o userId do usuário que a criou', () => {
      expect(response).to.have.property('userId');
      expect(response.userId).to.equal(userId.toString());
    })
  })
});

describe('É possível recupear uma receita pelo ID em GET /recipes/:id', () => {
  let conn;

  before(async () => {
    conn = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(conn);
  })

  beforeEach(async () => {
    const db = await conn.db('Cookmaster');
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
  })

  after(() => {
    MongoClient.connect.restore();
    connection.close();
  });

  describe('Quando a receita for encontrada', () => {
    let response;

    beforeEach(async () => {
      const recipeId = ObjectId();

      const payloadRecipe = {
        _id: recipeId,
        name: "Frango",
        ingredients: "Frango, sazon",
        preparation: "10 minutos no forno",
        userId: ObjectId()
      }

      const db = await conn.db('Cookmaster');
      await db.collection('recipes').insertOne(payloadRecipe);

      response = await chai.request(app)
        .get(`/recipes/${recipeId}`)
        .send()
        .then(({ body }) => body);
    })

    it('retorna um objeto contendo a receita', () => {
      expect(response).to.be.a('object');
      expect(response).to.have.all.keys([
        '_id', 'name', 'ingredients', 'preparation', 'userId'
      ]);
    })
  })

  describe('Quando a receita não for encontrada', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .get(`/recipes/${ObjectId()}`)
        .send()
        .then(({ body }) => body);
    })

    it('retorna um objeto contendo a mensagem de erro', () => {
      expect(response).to.be.a('object');
      expect(response.message).to.equal('recipe not found');
    })
  })
})

describe('É possível recupear todas as receitas em GET /recipes', () => {
  let conn;

  before(async () => {
    conn = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(conn);
  })

  beforeEach(async () => {
    const db = await conn.db('Cookmaster');
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
  })

  after(() => {
    MongoClient.connect.restore();
    connection.close();
  });


  describe('Quando encontrar receitas no banco de dados', () => {
    let response;

    beforeEach(async () => {
      const db = await conn.db('Cookmaster');

      const recipeId = ObjectId();

      const payloadRecipe = {
        _id: recipeId,
        name: "Frango",
        ingredients: "Frango, sazon",
        preparation: "10 minutos no forno",
        userId: ObjectId()
      }

      await db.collection('recipes').insertOne(payloadRecipe);

      response = await chai.request(app)
        .get(`/recipes`)
        .send()
        .then(({ body }) => body);
    })

    it('retorna um array contendo as receitas', () => {
      expect(response).to.be.an('array');
      expect(response).to.have.lengthOf(1);
    })
  })

  describe('Quando não encontrar receitas', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .get(`/recipes`)
        .send()
        .then(({ body }) => body);
    })

    it('retorna um array vazio', () => {
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    })
  })
})

describe('É possível remover uma receita em DELETE /recipes/:id', () => {
  let conn;

  before(async () => {
    conn = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(conn);
  })

  beforeEach(async () => {
    const db = await conn.db('Cookmaster');
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
  })

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
        name: "Frango",
        ingredients: "Frango, sazon",
        preparation: "10 minutos no forno",
        userId: ObjectId()
      }

      const db = await conn.db('Cookmaster');
      await db.collection('recipes').insertOne(payloadRecipe);
      
      response = await chai.request(app)
        .delete(`/recipes/${recipeId}`)
        .send()
        .then(({ body }) => body);
    })

    it('retorna um objeto com a mensagem de error', () => {
      expect(response).to.be.a('object');
      expect(response.message).to.equal('missing auth token');
    })
  })

  describe('Quando a receita for removida com sucesso', () => {
    let response;

    beforeEach(async () => {
      const userId = ObjectId();
      const recipeId = ObjectId();

      const payloadUser = {
        _id: userId,
        name: "Teste",
        email: "teste@gmail.com",
        password: "12345678",
        role: "user"
      }

      const payloadRecipe = {
        _id: recipeId,
        name: "Frango",
        ingredients: "Frango, sazon",
        preparation: "10 minutos no forno",
        userId: userId
      }

      const db = await conn.db('Cookmaster');
      await db.collection('recipes').insertOne(payloadRecipe);
      await db.collection('users').insertOne(payloadUser);

      const { _id, email, role } = payloadUser;
      const token = jwt.sign({ id: _id, email, role }, secret);

      response = await chai.request(app)
        .delete(`/recipes/${recipeId}`)
        .set('Authorization', token)
        .send()
        .then(({ body }) => body);
    })

    it('retorna um objeto vazio', () => {
      expect(response).to.be.a('object');
      expect(response).to.be.empty;
    })
  })

  describe('Quando não houver nenhuma receita com o id', () => {
    let response;

    beforeEach(async () => {
      const payloadUser = {
        _id: ObjectId(),
        name: "Teste",
        email: "teste@gmail.com",
        password: "12345678",
        role: "user"
      }

      const db = await conn.db('Cookmaster');
      await db.collection('users').insertOne(payloadUser);

      const { _id, email, role } = payloadUser;
      const token = jwt.sign({ id: _id, email, role }, secret);

      response = await chai.request(app)
        .delete(`/recipes/${ObjectId()}`)
        .set('Authorization', token)
        .send()
        .then(({ body }) => body);
    })

    it('retorna um objeto com a mensagem de error', () => {
      expect(response).to.be.a('object');
      expect(response).to.have.property('message');
      expect(response.message).to.equal('Deletion failed');
    })
  })
})
