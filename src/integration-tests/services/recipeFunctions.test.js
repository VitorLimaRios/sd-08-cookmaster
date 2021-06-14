const chai = require('chai');
const sinon = require('sinon');

const service = require('../../services/recipeFunctions.service');
const model = require('../../models/recipe.model');

const { expect } = chai;
const { registerRecipe } = service;

const newRecipe = {
  name: 'Receita do Jacquin',
  ingredients: 'Frango',
  preparation: '10 minutos no forno',
};

const registeredRecipe = {
  _id: '5f46919477df66035f61a356',
  name: 'Receita do Jacquin',
  ingredients: 'Frango',
  preparation: '10 minutos no forno',
  userId: '5f46914677df66035f61a355',
};

describe('SERVICE recipeFunctions.service.js', async () => {
  describe('Quando é registrado com sucesso', async () => {
    it('Existe uma função registerRecipe em service', () => {
      expect(typeof registerRecipe).equal('function');
    });
  });
});
