const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient, ObjectId } = require('mongodb');
const ConnectionMock = require('./connection');

const connectionDB = require('../../models/connection');
const ModelDefault = require('../../models/modelDefault');
const ModelUser = require('../../models/modelUser');

const databaseFakeUser = require('./data/user');

describe('MODEL', async () => {
  const newUser = {
    name: 'Default User',
    email: 'defaultEmail@email.com',
    password: 'defaultPassword',
    role: 'user',
  };

  const userTestProperty = {
    name: 'Default User',
    email: 'defaultEmail@email.com',
    password: 'defaultPassword',
    role: 'user',
  };

  describe('Connection', async () => {
    const connectionMock = new ConnectionMock();
    before(async () => {
      const conn = await connectionMock.getConnection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
    });

    after(() => {
      MongoClient.connect.restore();
      sinon.restore();
      connectionMock.dbServer.stop();
    });

    it('Test if the connection is a function', () => {
      expect(connectionDB).to.be.a('function');
    });
    it('Test if the function returns an object', async () => {
      const result = await connectionDB();
      expect(result).to.be.an('object');
    });
  });

  describe('Default', async () => {
    const connectionMock = new ConnectionMock();
    const modelDefault = new ModelDefault();

    before(async () => {
      const conn = await connectionMock.getConnection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
    });

    after(() => {
      MongoClient.connect.restore();
      sinon.restore();
      connectionMock.dbServer.stop();
    });

    describe('create', async () => {
      beforeEach(() => {
        sinon.spy(modelDefault, '_conn');
        sinon.spy(modelDefault, 'create');
      });

      afterEach(() => {
        modelDefault.create.restore();
        modelDefault._conn.restore();
      });

      it('Create a document', async () => {
        const result = await modelDefault.create('users', newUser);
        newUser._id = result._id;
        expect(modelDefault._conn.calledOnce).to.be.true;
        expect(modelDefault.create.calledOnce).to.be.true;
        expect(newUser).to.deep.equal(newUser);
      });

      it('Return an error if you don`t pass collection name', async () => {
        const result = await modelDefault.create('', newUser);
        expect(result.message).to.be.equal('collection names cannot be empty');
      });
    });

    describe('createMany', async () => {
      let result = null;
      before(async () => {
        result = await modelDefault.createMany('users', databaseFakeUser);
      });

      after(async () => {
        modelDefault.dropCollection('users');
      });

      it('Return is an array', async () => {
        expect(result).to.be.an('array');
        expect(result).to.have.length(4);
      });
    });

    describe('getByKey', async () => {
      let spy;
      before(async () => {
        await modelDefault.createMany('users', databaseFakeUser);
        spy = sinon.spy(modelDefault, 'getByKey');
      });

      after(async () => {
        await modelDefault.dropCollection('users');
        spy.restore();
      });

      it('Search for a document by email', async () => {
        const { email } = databaseFakeUser[2];
        const getUser = await modelDefault.getByKey('users', { email });
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith('users', { email })).to.be.true;
      });

      it('Check the properties returned from the document', async () => {
        const userExpected = databaseFakeUser[3];
        const { email } = databaseFakeUser[3];
        const result = await modelDefault.getByKey('users', { email });

        expect(result).to.be.property('_id');
        expect(result).to.be.property('name');
        expect(result).to.be.property('password');
        expect(result).to.be.property('email');
        expect(result).to.be.property('role');

        expect(result).to.be.an('object');
        expect(ObjectId.isValid(result._id)).to.be.true;
        expect(result.name).to.be.an('string');
        expect(result.password).to.be.an('string');
        expect(result.email).to.be.an('string');
        expect(result.role).to.be.an('string');
      });

      it('Check if the returned document is expected', async () => {
        const userExpected = databaseFakeUser[2];
        const { email } = databaseFakeUser[2];
        const result = await modelDefault.getByKey('users', { email });

        expect(ObjectId.isValid(result._id)).to.be.true;
        expect(userExpected.name).to.equal(result.name);
        expect(userExpected.email).to.equal(result.email);
        expect(userExpected.password).to.equal(result.password);
        expect(userExpected.role).to.equal(result.role);
      });
    });
  });

  describe('User', async () => {
    const modelUser = new ModelUser();
    const connectionMock = new ConnectionMock();

    before(async () => {
      const conn = await connectionMock.getConnection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
    });

    after(() => {
      MongoClient.connect.restore();
      sinon.restore();
      connectionMock.dbServer.stop();
    });

    describe('create', async () => {
      afterEach(async () => {
        await modelUser.dropUserCollection();
      });

      it('Create user', async () => {
        const result = await modelUser.createUser(userTestProperty);
        userTestProperty._id = result._id;
        expect(result).to.deep.equal(userTestProperty);
      });

      it('Create user and test property', async () => {
        const result = await modelUser.createUser(userTestProperty);
        expect(result).to.property('_id');
        expect(result).to.property('name');
        expect(result).to.property('password');
        expect(result).to.property('email');
        expect(result).to.property('role');
      });

      it('Create user and test property types', async () => {
        const result = await modelUser.createUser(userTestProperty);
        expect(ObjectId.isValid(result._id)).to.be.true;
        expect(result.name).to.be.a('string');
        expect(result.email).to.be.a('string');
        expect(result.password).to.be.a('string');
        expect(result.role).to.be.a('string');
      });
    });

    describe('getByUserKey', () => {
      before(async () => {
        await modelUser.createMany('users', databaseFakeUser);
      });

      after(async () => {
        await modelUser.dropCollection('users');
      });

      it('Check if the returned user is expected', async () => {
        const getUser = databaseFakeUser[1];
        const { email } = databaseFakeUser[1];
        const result = await modelUser.getUserByKey({ email });

        expect(ObjectId.isValid(result._id)).to.be.true;
        expect(getUser.name).to.equal(result.name);
        expect(getUser.email).to.equal(result.email);
        expect(getUser.password).to.equal(result.password);
        expect(getUser.role).to.equal(result.role);
      });

      it('Looking for an email that doesn\'t exist', async () => {
        const email = 'fulanotest123@bol.com.br';
        const result = await modelUser.getUserByKey({ email });
        expect(result).to.be.null;
      });
    });
  });
});
