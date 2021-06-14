const {code, message} = require('../helper/status');

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

const userBodyRequest = (user) => {
  if(
    !user || !user.name || !user.email || !user.password || !emailRegex.test(user.email)
  ){
    throw new Error(
      JSON.stringify(
        {
          status: code.UNPROCESSABLE,
          message: message.invalid_entries
        }
      )
    );
  }
};

const userAlreadyExists = (userExists) => {
  if(userExists) {
    throw new Error(
      JSON.stringify(
        {
          status: code.CONFLICT,
          message: message.email_registred,
        }
      )
    );
  }
};

const loginBodyRequest = (user) => {
  if(
    !user || !user.email || !user.password
  ){
    throw new Error(
      JSON.stringify(
        {
          status: code.UNAUTHORIZED,
          message: message.fields_must_be_filled,
        }
      )
    );
  };
};

const loginIsValid = (user, dbUser) => {
  if(!dbUser || user.password !== dbUser.password) {
    throw new Error(
      JSON.stringify(
        {
          status: code.UNAUTHORIZED,
          message: message.inc_user_or_pass,
        }
      )
    );
  }
};

const recipeBodyRequest = (recipe) => {
  if(
    !recipe || !recipe.name || !recipe.ingredients || !recipe.preparation 
  ){
    throw new Error(
      JSON.stringify(
        {
          status: code.UNPROCESSABLE,
          message: message.invalid_entries
        }
      )
    );
  }
};

const isFalse = (boolean) => {
  if (!boolean) {
    throw new Error(
      JSON.stringify(
        {
          status: code.NOT_FOUND,
          message: message.recipe_not_found,
        }
      )
    );
  }
};

const doYouHavePermission = (recipe, data) => {
  isFalse(recipe);
  if(
    data.role !== 'admin' && data._id != recipe.userId
  ) {
    throw new Error (
      JSON.stringify(
        {
          
          status: code.UNAUTHORIZED,
          message: message.unauthorized,
          
        }
      )
    );
  }
};

module.exports = {
  userBodyRequest,
  userAlreadyExists,
  loginBodyRequest,
  loginIsValid,
  recipeBodyRequest,
  isFalse,
  doYouHavePermission,
};