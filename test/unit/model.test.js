const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient, ObjectId } = require('mongodb');
const ConnectionMock = require('./connection');

const connectionDB = require('../../src/models/connection');
const ModelDefault = require('../../src/models/modelDefault');
const ModelUser = require('../../src/models/modelUser');

describe('MODEL', async () => {
  
  describe('Connection', async () => {
    const connectionMock = new ConnectionMock();
    before(async() => {
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
    const newUser = {
      name: 'Default User',
      email: 'defaultEmail@email.com',
      password: 'defaultPassword',
      role: 'user'
    }

    const connectionMock = new ConnectionMock();
    const modelDefault = new ModelDefault();
  
    before(async() => {
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
      })

      it('Create a user', async () => {
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
    
  });

  describe('User', async () => {
    
    const userTestProperty = {
      name: 'Default User',
      email: 'defaultEmail@email.com',
      password: 'defaultPassword',
      role: 'user'
    }
    
    const modelUser = new ModelUser();
    const connectionMock = new ConnectionMock();

    before(async() => {
      const conn = await connectionMock.getConnection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
    });
    
    after(() => {
      MongoClient.connect.restore();
      sinon.restore();
      connectionMock.dbServer.stop();
    });
    
    afterEach(async() =>{
      await modelUser.dropUserCollection();
    })
    
    describe('create', async () => {  
      it('Create user', async () => {
        const result = await modelUser.createUser(userTestProperty)
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
  });

});
