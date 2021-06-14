const chai = require('chai');
const sinon = require('sinon');

const service = require('../../services/userManagement.service');
const model = require('../../models/user.model');

const { expect } = chai;
const { createUser } = service;

const newUser = {
  name: 'Erick Jacquin',
  email: 'erickjacquin@gmail.com',
  password: '12345678',
  role: 'user',
};

const registeredUser = {
  _id: '5f46914677df66035f61a355',
  name: 'Erick Jacquin',
  email: 'erickjacquin@gmail.com',
  password: '12345678',
  role: 'user',
};

describe('SERVICE userManagement.service.js', () => {
  describe('quando é cadastrado com sucesso', async () => {

    before(() => {
      sinon.stub(model, 'add').resolves(registeredUser);
    });

    after(() => {
      model.add.restore();
    })
    
    it('teste se createUser é do tipo função', () => {
      expect(typeof createUser).equal('function');
    });

  });
});
