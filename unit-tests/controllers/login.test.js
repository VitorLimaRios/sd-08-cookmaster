const { expect } = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const httpStatusCodes = require('../../src/data/httpStatusCodes');
const createError = require('../../src/utils/createError');

const UserService = require('../../src/services/user');
const login = require('../../src/controllers/login');

describe('É possível fazer login', () => {
  let request, response, next;
  
  beforeEach(() => {
    request = {};
    response = {};
    response.body = {};
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  describe('Quando o login falhar', () => {
    before(() => sinon.stub(UserService, 'getByEmail').resolves(null));

    after(() => UserService.getByEmail.restore());

    const scenarios = require('./loginScenarios');

    const mustCallNextWithAnErrorObject = (expectedError) => async () => {
      await login(request, response, next);
      expect(next.calledWith(expectedError)).to.be.true;
    };
  
    scenarios.forEach(({ title, body, errorMessage }) => {
      describe(title, () => {
        beforeEach(() => request.body = body);
        it('chama next com o objeto contento o erro',
          mustCallNextWithAnErrorObject(createError(errorMessage, 'invalid_login')));
      });
    });
  });

  describe('Quando for logado com sucesso', () => {
    const payload = {
      id: ObjectId(),
      name: 'name',
      email: 'email@email.com',
      password: '123123123',
      role: 'user'
    };

    const token = 'someRandomToken';

    before(() => {
      sinon.stub(UserService, 'getByEmail').resolves(payload);
      sinon.stub(jwt, 'sign').returns(token);
    });

    after(() => {
      UserService.getByEmail.restore();
      jwt.sign.restore();
    });

    beforeEach(() => {
      request.body = {
        email: 'email@email.com',
        password: '123123123',
      };
    });

    it('retorna status 200', async () => {
      await login(request, response, next);
      expect(response.status.calledWith(httpStatusCodes.OK)).to.be.true;
    });

    it('chama response.json com um objeto contendo o token', async () => {
      await login(request, response, next);
      expect(response.json.calledWith({ token })).to.be.true;
    });
  });
});
