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

describe('Test Init', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  describe('POST /users', () => {
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
            name: 'Remy',
            email: 'remy@ratatouille.com',
            role: 'user',
            _id:`${response.body.user._id}`,
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

  describe('POST /login', () => {
    describe('2.1 - When registration fails due to an invalid entry', () => {
      describe('2.1.1 - When email field is empty', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/login')
            .send({ email: '', password: '123456' });
        });

        it('returns status code "401"', () => {
          expect(response).to.have.status(401);
        });
    
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });

        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });

        it('the "message" property has the value: "All fields must be filled"', () => {
          expect(response.body.message).to.be.equal('All fields must be filled')
        });
      });

      describe('2.1.2 - When password field is empty', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/login')
            .send({ email: 'remy@ratatouille.com', password: '' });
        });

        it('returns status code "401"', () => {
          expect(response).to.have.status(401);
        });
    
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });

        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });

        it('the "message" property has the value: "All fields must be filled"', () => {
          expect(response.body.message).to.be.equal('All fields must be filled')
        });
      });

      describe('2.1.3 - When password field is wrong', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/login')
            .send({ email: 'remy@ratatouille.com', password: '12345' });
        });

        it('returns status code "401"', () => {
          expect(response).to.have.status(401);
        });
    
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });

        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });

        it('the "message" property has the value: "Incorrect username or password"', () => {
          expect(response.body.message).to.be.equal('Incorrect username or password')
        });
      });

      describe('2.1.3 - When email field is wrong', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/login')
            .send({ email: 'remyy@ratatouille.com', password: '123456' });
        });

        it('returns status code "401"', () => {
          expect(response).to.have.status(401);
        });
    
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });

        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });

        it('the "message" property has the value: "Incorrect username or password"', () => {
          expect(response.body.message).to.be.equal('Incorrect username or password')
        });
      });
    });
      
    describe('2.2 - When the login is successful', () => {
      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send({ email: 'remy@ratatouille.com', password: '123456'});
      });

      it('returns status code "200"', () => {
        expect(response).to.have.status(200);
      });

      it('returns an object in the body', () => {
        expect(response.body).to.be.an('object');
      });

      it('the response object has the property "token"', () => {
        expect(response.body).to.have.property('token');
      });

      it(`the "token" property has an encrypted string`, async () => {
        expect(typeof (response.body.token)).to.be.equals('string');
      });
    });
  });
});
