const { MongoClient } = require('mongodb');
const server = require("../api/server");
const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const  getConnection  = require('./connectionMock');

const USER_LOGIN = {
  email: "joao@hotmail.com",
  password: "fdafdasfdasf",
};

const CREATE_USER = {
  name: "João Francisco",
  email: "joao@hotmail.com",
  password: "fdafdasfdasf",
};

const RECIPE = {
  name: 'Nas Noite Mais Escura',
  ingredients: 'Na Noite Mais Fria ',
  preparation: 'Lá estarão os Lanternas Verdes',
};


describe("POST /Recipes", () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe("1-) Não é passado name, ingredients e preparation", () => {
    let response;

    before(async () => {
      response = await chai.request(server).post("/recipes").send({});
    });

    it("Retorna código de erro 401", () => {
      expect(response).to.have.status(401);
    });
    it("Retorna um objeto como resposta", () => {
      expect(response.body).to.be.an("object");
    });
    it("Retorna uma propriedade com nome de 'message'", () => {
      expect(response.body).to.be.property("message");
    });
    it("Retorna a mensagem de erro dentro da propriedade 'message'", () => {
      expect(response.body.message).to.be.equals("missing auth token");
    });
  });
  describe("2-) Verifica se é possível cadastrar uma receita com sucesso", () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock
        .db("Cookmaster")
        .collection("users");
      await usersCollection.deleteMany();
      await usersCollection.insertOne(CREATE_USER);

      response = await chai.request(server).post("/login").send(USER_LOGIN);

      const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
      await recipesCollection.deleteMany();

      const token = await chai
        .request(server)
        .post('/login')
        .send(USER_LOGIN)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .post('/recipes')
        .set('authorization', token)
        .send(RECIPE);
    });

    it('Retorna com código de sucesso "201"', () => {
      expect(response).to.have.status(201);
    });

    it('Retorna um objeto como resposta', () => {
      expect(response.body).to.be.an('object');
    });

    it("Retorna um um objeto com a propriedade 'recipe'", () => {
      expect(response.body).to.have.property('recipe');
    });

    it("Retorna um um objeto com a propriedade 'name'", () => {
      expect(response.body.recipe).to.have.property('name');
    });

    it("Retorna um um objeto com a propriedade 'ingredients'", () => {
      expect(response.body.recipe).to.have.property('ingredients');
    });

    it("Retorna um um objeto com a propriedade 'preparation'", () => {
      expect(response.body.recipe).to.have.property('preparation');
    });

    it("Retorna um um objeto com a propriedade '_id'", () => {
      expect(response.body.recipe).to.have.property('_id');
    });
  });
});
