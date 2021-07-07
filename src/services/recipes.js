const jwt = require('jsonwebtoken');

const valid = require('../validation/recipes');
const modelRecipe = require('../models/recipes');


const secret = 'senha';

const create = async (token, name, ingredients, preparation) => {
  const senha = jwt.verify(token, secret, (err, decode) => {
    if(err) {
      err.message = 'jwt malformed';
      err.statusCode = 401;
      throw err;
    };
    return decode;
  });
  const { _id: userId } = senha['data'];

  const { error } = valid.create.validate({name, ingredients,preparation});
  if(error) {
    error.statusCode = 400;
    error.message = 'Invalid entries. Try again.';
    throw error;
  }
  const recipe = await modelRecipe.create(name, ingredients, preparation, userId);
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: recipe._id
    }
  };

};


module.exports = {
  create,
};