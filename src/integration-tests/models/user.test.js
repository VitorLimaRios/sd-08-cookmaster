const chai = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const model = require('../../models/user.model');
const { getConnection } = require('../helpers/connectionMock');
const { expect } = chai;
const { add, update, exclude, getById, getByName } = model;

let connectionMock;

describe('MODEL user.model.js', () => {
  const entry = {
    name: 'Maria do carmo',
    email: 'maria_carmo@gmail.com',
    password: '123456789',
    role: 'user',
  };
  const entryUpdate = {
    name: 'Macio Manuel',
    email: 'macio_manuel@gmail.com',
    password: '987654321',
    role: 'admin',
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('quando é cadastrado com sucesso', async () => {
    let newUser;

    before(async () => {
      newUser = await add(entry);
      await exclude(newUser._id);
    });

    it('Existe uma função add que recebe um object { name, email, password, role }', async () => {
      expect(typeof add).equal('function');
    });

    it('tipo é um object', () => {
      expect(newUser).to.be.an('object');
    });

    it('Cadastro contem as chaves { _id, name, email, password, role }', () => {
      expect(newUser).to.have.property('_id');
      expect(newUser.name).to.be.equal(entry.name);
      expect(newUser.email).to.be.equal(entry.email);
      expect(newUser.password).to.be.equal(entry.password);
      expect(newUser.role).to.be.equal(entry.role);
    });

    it('Cadastro não contem as chaves null ou undefined { _id, name, email, password, role }', () => {
      expect(newUser._id).to.not.empty;
      expect(newUser.name).to.not.empty;
      expect(newUser.email).to.not.empty;
      expect(newUser.password).to.not.empty;
      expect(newUser.role).to.not.empty;
    });

    it('Cadastro contem apenas 5 (cinco) chaves', () => {
      expect(newUser).to.deep.equal({ _id: newUser._id, ...entry });
    });
  });

  describe('quando é atualizado com sucesso', async () => {
    let beforeUser;
    let afterUser;

    before(async () => {
      beforeUser = await add(entry);
      afterUser = await update(beforeUser._id, entryUpdate);
      await exclude(beforeUser._id);
    });

    it('Existe uma função update', async () => {
      expect(typeof update).equal('function');
    });

    it('atualizando as chaves { name, email, password, role } estão diferentes e { id } igual', () => {
      expect(afterUser._id).to.be.equal(beforeUser._id);
      expect(afterUser.name).not.to.be.equal(beforeUser.name);
      expect(afterUser.email).not.to.be.equal(beforeUser.email);
      expect(afterUser.password).not.to.be.equal(beforeUser.password);
      expect(afterUser.role).not.to.be.equal(beforeUser.role);
    });

    it('atualizando não contem as chaves null ou undefined { _id, name, email, password, role }', () => {
      expect(afterUser._id).to.not.empty;
      expect(afterUser.name).to.not.empty;
      expect(afterUser.email).to.not.empty;
      expect(afterUser.password).to.not.empty;
      expect(afterUser.role).to.not.empty;
    });
  });

  describe('quando é deletado com sucesso', async () => {
    let beforeUser;
    let afterUser;
    let getByUser;

    before(async () => {
      beforeUser = await add(entry);
      afterUser = await exclude(beforeUser._id);
      getByUser = await getById(beforeUser._id);
    });

    it('Existe uma função delete', async () => {
      expect(typeof exclude).equal('function');
    });

    it('deletado um usuario returna undefined', () => {
      expect(afterUser).to.be.undefined;
    });

    it('deletado com sucesso', () => {
      expect(getByUser).to.be.null;
    });

  });

  describe('quando é feito a busca por nome com sucesso', async () => {
    let userCurrent;
    let userById;
    let userByName;

    before(async () => {
      userCurrent = await add(entry);
      userById = await getById(userCurrent._id);
      userByName = await getByName(userCurrent.name);

    });

    it('Existe uma função getByName', async () => {
      expect(typeof getByName).equal('function');
    });

    it('buscando um usuario por nome é igual a trazer por id', () => {
      expect(userByName.name).to.be.equal(userById.name);
    });

    it('buscando um usuario que não existe retorna null', async () => {
      await exclude(userCurrent._id);
      userByName = await getByName(userCurrent.name)
      expect(userByName).to.be.null;
    });

  });

});
