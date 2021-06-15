const { expect } = require('chai');
const sinon = require('sinon');
const errorMiddleware = require('../../src/middlewares/error');
const createError = require('../../src/utils/createError');
const httpStatusCodes = require('../../src/data/httpStatusCodes');

describe('Middleware de Error', () => {
  let request, response, next;

  beforeEach(() => {
    request = {};
    response = {};
    response.json = sinon.stub().returns();
    response.status = sinon.stub().returns(response);
    next = sinon.stub().returns();
  });

  it('retorna status 400 se o code for invalid_data', () => {
    const error = createError('Error genérico', 'invalid_data');
    errorMiddleware(error, request, response, next);
    expect(response.status.calledWith(httpStatusCodes.BAD_REQUEST)).to.be.true;
  });

  it('retorna status 409 se o code for conflict', () => {
    const error = createError('Error genérico', 'conflict');
    errorMiddleware(error, request, response, next);
    expect(response.status.calledWith(httpStatusCodes.CONFLICT)).to.be.true;
  });

  it('chama response.json com um objeto contendo a mensagem de error', () => {
    const error = createError('Error genérico', 'invalid_data');
    errorMiddleware(error, request, response, next);
    expect(response.json.calledWith({ message: 'Error genérico' })).to.be.true;
  });
});
