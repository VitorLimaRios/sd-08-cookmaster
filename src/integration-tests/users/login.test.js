const { MongoClient } = require("mongodb");
const server = require("../../api/server");
const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const getConnection = require("../connectionMock");

const USER_LOGIN = {
  email: "joao@hotmail.com",
  password: "fdafdasfdasf",
};

const CREATE_USER = {
  name: "João Francisco",
  email: "joao@hotmail.com",
  password: "fdafdasfdasf",
};

describe("POST /login", () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, "connect").resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe("1-) Não é passado usuário", () => {
    let response;

    before(async () => {
      response = await chai.request(server).post("/login").send({});
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
      expect(response.body.message).to.be.equals("All fields must be filled");
    });
  });

  describe("2-) Usuário ou senha vazios", () => {
    let response;

    before(async () => {
      response = await chai
        .request(server)
        .post("/login")
        .send({ email: "fake@fake.com.br", password: "12345678" });
    });

    it("Retorna código de erro 401", () => {
      console.log(response.body.message);
      expect(response).to.have.status(401);
    });
    it("Retorna um objeto como resposta", () => {
      expect(response.body).to.be.an("object");
    });
    it("Retorna uma propriedade com nome de 'message'", () => {
      expect(response.body).to.be.property("message");
    });
    it("Retorna a mensagem de erro dentro da propriedade 'message'", () => {
      expect(response.body.message).to.be.equals(
        "Incorrect username or password"
      );
    });
  });
  describe("3 - Login efetuado com sucesso", () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock
        .db("Cookmaster")
        .collection("users");
      await usersCollection.deleteMany();
      await usersCollection.insertOne(CREATE_USER);

      response = await chai.request(server).post("/login").send(USER_LOGIN);
    });

    it("Retorna código de sucesso 200", () => {
      expect(response).to.have.status(200);
    });

    it("Retorna um objeto como resposta", () => {
      expect(response.body).to.be.an("object");
    });

    it("Retorna uma propriedade com nome de 'token'", () => {
      expect(response.body).to.have.property("token");
    });

    it("A propriedade não retorna com conteúdo", () => {
      expect(response.body.token).to.not.be.empty;
    });
  });
});
