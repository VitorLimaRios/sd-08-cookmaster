require('dotenv').config();

const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const sinon = require('sinon');
const connection = require('../../models/connection');

const getConnection = require('./getConnection');
const UserModel = require('../../models/user');

describe('É possível cadastrar um usuário', () => {
  let conn;

  const payloadUser ={
    name: 'string',
    email: 'string',
    password: 'string'
  };

  before(async () => {
    conn = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(conn);
  });

  after(() => {
    MongoClient.connect.restore();
    connection.close();
  });

  describe('Quando cadastrado com sucesso', () => {
    afterEach(async () => {
      const db = await conn.db(process.env.DB_NAME);
      await db.collection('users').deleteMany({});
    });

    it('retorna um objeto', async () => {
      const result = await UserModel.create(payloadUser);
      expect(result).to.be.a('object');
    });

    it('o objeto retornado deve ser referente ao novo cadastro', async () => {
      const result = await UserModel.create(payloadUser);
      expect(result).to.have.all.keys(['_id', 'name', 'email', 'password', 'role']);
      const { name, email, password } = result;
      expect(name).to.equal(payloadUser.name);
      expect(email).to.equal(payloadUser.email);
      expect(password).to.equal(payloadUser.password);
    });

    it('deve ter a role user por padrão', async () => {
      const result = await UserModel.create(payloadUser);
      expect(result).to.have.property('role');
      expect(result.role).to.equal('user');
    });

    it('é possível especificar a role ao criar o usuário', async () => {
      const result = await UserModel.create({ ...payloadUser, role: 'admin' });
      expect(result).to.have.property('role');
      expect(result.role).to.equal('admin');
    });
  });
});

describe('É possível pesquisar um usuário pelo email', () => {
  before(async () => {
    const conn = await getConnection();

    const db = await conn.db(process.env.DB_NAME);

    await db.collection('users').insertOne({
      name: 'name',
      email: 'validemail@email.com',
      password: 'password',
      role: 'user'
    });

    sinon.stub(MongoClient, 'connect').resolves(conn);
  });

  after(() => {
    MongoClient.connect.restore();
    connection.close();
  });

  describe('Quando é encontrado', () => {
    it('retorna um objeto referente a um usuário', async () => {
      const result = await UserModel.getByEmail('validemail@email.com');
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys(['_id', 'name', 'password', 'email', 'role']);
    });
  });

  describe('Quando não é encontrado', () => {
    it('retorna null', async () => {
      const result = await UserModel.getByEmail('emailinexistente@email.com');
      expect(result).to.be.null;
    });
  });
});
