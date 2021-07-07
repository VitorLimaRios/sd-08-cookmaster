const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const server = require('../api/app');
const connectionMock = require('./connectionMock');

chai.use(chaiHttp);
const { expect } = chai;

let mockedConnection = null;
const validRecipes = [
  {
  'name': 'Fake recipe',
  'ingredients': 'chicken, potato',
  'preparation': '10 minutes in the grill',
  'userId': '507f1f77bcf86cd799439011'
  },
  {
  'name': 'Fake recipe 2',
  'ingredients': 'Pork, potato',
  'preparation': '40 minutes in the grill',
  'userId': '507f191e810c19729de860ea'
  },
  {
  'name': 'Fake recipe 3',
  'ingredients': 'Duck',
  'preparation': '5 minutes in the sun',
  'userId': '5099803df3f4948bd2f98391'
  },
]
const invalidRecipe = {
  "name": "",
  "ingredients": "",
}

describe('API de receitas', () => {
  before(async () => {
    mockedConnection = await connectionMock();
    sinon.stub(MongoClient, 'connect').resolves(mockedConnection); 
  })

  beforeEach(async () => {
    const db = mockedConnection.db('Cookmaster')
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
  })

  after(() => {
    MongoClient.connect.restore();
  })
  

  describe('/POST /recipes', () => {

    describe('Quando passa dados inválidos', () => {
      let token = null;
      let response = null;
      before(async () => {
        const db = mockedConnection.db('Cookmaster').collection('users');
        await db.insertOne({
          "name": "Fake User",
          "email": "fake11232@email.com",
          "password": "123123"
        })

        token = await chai.request(server)
          .post('/login')
          .send({
            "email": "fake11232@email.com",
            "password": "123123"
          }).then(({ body }) => body.token);

        response = await chai.request(server)
          .post('/recipes')
          .set('Authorization', token)
          .send(invalidRecipe);
      })

      it('retorna o código de status "400"', () => {
        expect(response).to.has.status(400);
      })

      it('retorna um objeto no body com a chave "message"', () => {
        expect(response.body).to.be.an('object');
        expect(response.body).to.has.key('message');
      })

      it('A chave "message" tem o valor "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equals('Invalid entries. Try again.');
      })

    })

    describe('Quando passa um token inválido', () => {
      let response = null;

      before(async () => {
        const db = mockedConnection.db('Cookmaster').collection('users');
        await db.insertOne({
          "name": "Fake User",
          "email": "fake11232@email.com",
          "password": "123123"
        })

        token = await chai.request(server)
          .post('/login')
          .send({
            "email": "fake11232@email.com",
            "password": "123123"
          })

        response = await chai.request(server)
          .post('/recipes')
          .set('Authorization', 'invalidToken')
          .send(invalidRecipe);
      })

      it('retorna o código de status "401"', () => {
        expect(response).to.has.status(401);
      })

      it('retorna um objeto no body com a chave "message"', () => {
        expect(response.body).to.be.an('object');
        expect(response.body).to.has.key('message');
      })

      it('A chave "message" tem o valor "jwt malformed"', () => {
        expect(response.body.message).to.be.equals('jwt malformed');
      })
    })

    // describe('Quando não passa um token', () => {
    //   let response = null;

    //   before(async () => {
    //     const db = mockedConnection.db('Cookmaster').collection('users');
    //     await db.insertOne({
    //       "name": "Fake User",
    //       "email": "fake11232@email.com",
    //       "password": "123123"
    //     })

    //     token = await chai.request(server)
    //       .post('/login')
    //       .send({
    //         "email": "fake11232@email.com",
    //         "password": "123123"
    //       })

    //     response = await chai.request(server)
    //       .post('/recipes')
    //       .set('Authorization', '')
    //       .send(invalidRecipe);
    //   })

    //   it('retorna o código de status "401"', () => {
    //     expect(response).to.has.status(401);
    //   })

    //   it('retorna um objeto no body com a chave "message"', () => {
    //     expect(response.body).to.be.an('object');
    //     expect(response.body).to.has.key('message');
    //   })

    //   it('A chave "message" tem o valor "missing auth token"', () => {
    //     expect(response.body.message).to.be.equals('missing auth token');
    //   })
    // })

    describe('Quando adiciona a receita com sucesso', () => {
      let token = null;
      let response = null;
      before(async () => {
        const db = mockedConnection.db('Cookmaster').collection('users');
        await db.insertOne({
          "name": "Fake User",
          "email": "fake11232@email.com",
          "password": "123123"
        })

        token = await chai.request(server)
          .post('/login')
          .send({
            "email": "fake11232@email.com",
            "password": "123123"
          }).then(({ body }) => body.token);

        response = await chai.request(server)
          .post('/recipes')
          .set('Authorization', token)
          .send(validRecipes[0]);
      })

      it('retorna o código de status "201"', () => {
        expect(response).to.has.status(201);
      })

      it('retorna um objeto no body com a chave "recipe"', () => {
        expect(response.body).to.be.an('object');
        expect(response.body).to.has.key('recipe');
      })

      it(`A chave "recipe" é um objeto com os dados da receita adicionada
        com as chaves "_id" e "userId"`, () => {
        expect(response.body.recipe).to.be.an('object');
        expect(response.body.recipe).to.has.all.keys('_id', 'userId', 'name', 'ingredients', 'preparation');
      })
    })

  })

  describe('/GET /recipes', () => {
    describe('Faz a busca de todas as receitas com o token', () => {
      let token = null;
      let response = null;
      before(async () => {
        const db = mockedConnection.db('Cookmaster');
        await db.collection('users').insertOne({
          "name": "Fake User",
          "email": "fake11232@email.com",
          "password": "123123"
        })
        await db.collection('recipes').insertMany(validRecipes);

        token = await chai.request(server)
          .post('/login')
          .send({
            "email": "fake11232@email.com",
            "password": "123123"
          }).then(({ body }) => body.token);

        response = await chai.request(server)
          .get('/recipes')
          .set('Authorization', token)
      })

      it('retorna o código de status "200"', () => {
        expect(response).to.has.status(200);
      })
      it('retorna um array no body com todos as receitas cadastradas', () => {
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.equals(3);
      })
      it(`Cada objeto do array possui as chaves "_id", "name", "ingredients", "preparation"
        e "userId"`, () => {
        response.body.forEach((item) => {
          expect(item).to.has.all.keys('_id', 'name', 'ingredients', 'preparation', 'userId')
        })
      })
    })
    describe('Faz a busca de todas as receitas sem o token', () => {
      let response = null;
      before(async () => {
        const db = mockedConnection.db('Cookmaster').collection('recipes');
        await db.insertMany(validRecipes);

        response = await chai.request(server)
          .get('/recipes');
      })

      it('retorna o código de status "200"', () => {
        expect(response).to.has.status(200);
      })
      it('retorna um array no body com todos as receitas cadastradas', () => {
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.equals(3);
      })
      it(`Cada objeto do array possui as chaves "_id", "name", "ingredients", "preparation"
        e "userId"`, () => {
        response.body.forEach((item) => {
          expect(item).to.has.all.keys('_id', 'name', 'ingredients', 'preparation', 'userId')
        })
      })
    })
  })

  describe('/GET /recipes/:id', () => {
    describe('Quando existe a receita no DB', () => {
      describe('Faz a busca da receita pelo ID com o token', () => {
        let token = null;
        let response = null;
        let insertedId = null;
        before(async () => {
          const db = mockedConnection.db('Cookmaster');
          await db.collection('users').insertOne({
            "name": "Fake User",
            "email": "fake11232@email.com",
            "password": "123123"
          })
          await db.collection('recipes').insertMany(validRecipes);
          insertedId = await db.collection('recipes').findOne();
  
          token = await chai.request(server)
            .post('/login')
            .send({
              "email": "fake11232@email.com",
              "password": "123123"
            }).then(({ body }) => body.token);
  
          response = await chai.request(server)
            .get(`/recipes/${insertedId._id}`)
            .set('Authorization', token)
        })
  
        it('retorna o código de status "200"', () => {
          expect(response).to.has.status(200);
        })
        it(`retorna um objeto no body com as chaves "_id", "name", "ingredients",
          "preparation" e "userId"`, () => {
          expect(response.body).to.be.an('object');
          expect(response.body).to.has.all.keys('_id', 'name', 'ingredients', 'preparation', 'userId')
        })
      })
  
      describe('Faz a busca da receita pelo ID  sem o token', () => {
        let response = null;
        let insertedId = null;
        before(async () => {
          const db = mockedConnection.db('Cookmaster');
          await db.collection('recipes').insertMany(validRecipes);
          insertedId = await db.collection('recipes').findOne();

          response = await chai.request(server)
            .get(`/recipes/${insertedId._id}`)
            .set('Authorization', token)
        })
  
        it('retorna o código de status "200"', () => {
          expect(response).to.has.status(200);
        })
        it(`retorna um objeto no body com as chaves "_id", "name", "ingredients",
          "preparation" e "userId"`, () => {
          expect(response.body).to.be.an('object');
          expect(response.body).to.has.all.keys('_id', 'name', 'ingredients', 'preparation', 'userId')
        })
      })
    })

    describe('Quando não existe a receita no DB', () => {
      let response = null;
      let insertedId = null;
      before(async () => {
        const db = mockedConnection.db('Cookmaster');
        await db.collection('recipes').insertMany(validRecipes);
        insertedId = await db.collection('recipes').findOne();

        response = await chai.request(server)
          .get(`/recipes/507f1f77bcf86cd799439011`)
          .set('Authorization', token)
      })
      it('retorna o código de status "404"', () => {
        expect(response).to.has.status(404);
      });

      it('retorna um objeto no body com a chave "message"', () => {
        expect(response.body).to.be.an('object');
        expect(response.body).to.has.key('message');
      });

      it('A chave "message" tem o valor "recipe not found"', () => {
        expect(response.body.message).to.be.equals('recipe not found');
      });
        
      
    })


    
  })

});
