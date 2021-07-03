const jwt = require('jsonwebtoken');

const RecipeSchema = require('../schema/recipe');
const RecipeModel = require('../models/recipes');


const secret = 'senhasecretamentedificil';

const create = async (token, name, ingredients, preparation) => {
  const decoded = jwt.verify(token, secret, (err, decode) => {
    if(err) {
      err.message = 'jwt malformed';
      err.statusCode = 401;
      throw err;
    };
    return decode;
  });
  const { _id: userId } = decoded['data'];

  const { error } = RecipeSchema.create.validate({name, ingredients,preparation});
  if(error) {
    error.statusCode = 400;
    error.message = 'Invalid entries. Try again.';
    throw error;
  }
  const recipe = await RecipeModel.create(name, ingredients, preparation, userId);
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
