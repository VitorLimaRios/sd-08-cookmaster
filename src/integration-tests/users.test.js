const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { getConnection } = require('./connectionMock');
const { expect } = chai;

let connectionMock;
let response;

describe('POST /users', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('1.1 - When registration fails due to an invalid entry', () => {
    describe('1.1.1 - When name field is empty', () => {
      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({name: '', email: 'remy@ratatouille.com', password: '123456'});
      });

      it('returns status code "400"', () => {
        expect(response).to.have.status(400);
      });
  
      it('returns an object in the body', () => {
        expect(response.body).to.be.an('object');
      });

      it('the response object has the property "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('the "message" property has the value: "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.')
      });
    });

    describe('1.1.2 - When email field is empty', () => {
      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({name: 'Remy', email: '', password: '123456'});
      });

      it('returns status code "400"', () => {
        expect(response).to.have.status(400);
      });
  
      it('returns an object in the body', () => {
        expect(response.body).to.be.an('object');
      });

      it('the response object has the property "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('the "message" property has the value: "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.')
      });
    });

    describe('1.1.3 - When password field is empty', () => {
      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({name: 'Remy', email: 'remy@ratatouille.com', password: ''});
      });

      it('returns status code "400"', () => {
        expect(response).to.have.status(400);
      });
  
      it('returns an object in the body', () => {
        expect(response.body).to.be.an('object');
      });

      it('the response object has the property "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('the "message" property has the value: "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.')
      });
    });
  });
    
  describe('1.2 - When the registration is successful', () => {
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({name: 'Remy', email: 'remy@ratatouille.com', password: '123456'});
    });

    it('returns status code "201"', () => {
      expect(response).to.have.status(201);
    });

    it('returns an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('the response object has the property "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it(`the "user" property has the user's registration data as its value`, async () => {
      expect(response.body.user).to.be
        .deep.equals({
          _id:`${response.body.user._id}`,
          name: 'Remy',
          email: 'remy@ratatouille.com',
          password: '123456',
          role: 'user',
        });
    });
  });

  describe('1.3 - When a registration fails due to duplicity', () => {
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({name: 'Remy Clone', email: 'remy@ratatouille.com', password: '654321'});
    });

    it('returns status code "409"', () => {
      expect(response).to.have.status(409);
    });

    it('returns an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('the response object has the property "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('the "message" property has the value: "Email already registered"', () => {
      expect(response.body.message).to.be.equal('Email already registered')
    });
  });  
});
