const { MongoClient } = require("mongodb");
const server = require("../api/server");
const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const getConnection = require("./connectionMock");


const NEW_USER = { 
  name: 'Fulano de Tal',
  email: "fulano@fulano.com.br",
  password: '12345678'
}

describe("POST /User", () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, "connect").resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe("1-) Não é passado usuário, email e senha", () => {
    let response;

    before(async () => {
      response = await chai.request(server).post("/users").send({});
    });

    it("Retorna código de erro 400", () => {
      expect(response).to.have.status(400);
    });
    it("Retorna um objeto como resposta", () => {
      expect(response.body).to.be.an("object");
    });
    it("Retorna uma propriedade com nome de 'message'", () => {
      expect(response.body).to.be.property("message");
    });
    it("Retorna a mensagem de erro dentro da propriedade 'message'", () => {
      expect(response.body.message).to.be.equals("Invalid entries. Try again.");
    });
  });

  describe("2-) Não é possível cadastrar um usuário com email já cadastrado", () => {
    let response;

      before(async () => {
      const usersCollection = connectionMock
        .db("Cookmaster")
        .collection("users");
      await usersCollection.deleteMany();
      await usersCollection.insertOne(NEW_USER);

      response = await chai.request(server).post("/users").send(NEW_USER);
    });

    it("Retorna código de erro 409", () => {
      expect(response).to.have.status(409);
    });

    it("Retorna um objeto como resposta", () => {
      expect(response.body).to.be.an("object");
    });

    it("Retorna uma propriedade com nome de 'message'", () => {
      expect(response.body).to.have.property("message");
    });

    it("Retorna a mensagem de erro dentro da propriedade 'message'", () => {
      expect(response.body.message).to.be.equal("Email already registered");
    });
  });
  describe("3-) Verifica se é possível cadastrar um usuário com sucesso", () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany();
      response = await chai.request(server).post('/users').send(NEW_USER);
    });

    it("Retorna código de sucesso 201", () => {
      expect(response).to.have.status(201);
    });

    it("Retorna um objeto como resposta", () => {
      expect(response.body).to.be.an('object');
    });

    it("Retorna uma propriedade com nome de 'user'", () => {
      expect(response.body).to.have.property('user');
    });

    it("Retorna a propriedade 'name' dentro da propriedade 'user'", () => {
      expect(response.body.user).to.have.property('name');
    });

    it("Retorna a propriedade 'email' dentro da propriedade 'user'", () => {
      expect(response.body.user).to.have.property('email');
    });

    it("Retorna a propriedade 'role' dentro da propriedade 'user'", () => {
      expect(response.body.user).to.have.property('role');
    });

    it("Retorna a propriedade 'user' dentro da propriedade 'role'", () => {
      expect(response.body.user.role).to.be.equal('user');
    });

    it("Retorna a propriedade '_id' dentro da propriedade 'user'", () => {
      expect(response.body.user).to.have.property('_id');
    });
  });
})
