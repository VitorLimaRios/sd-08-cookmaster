const {code, message} = require('../helper/status');

// /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
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

module.exports = {
  userBodyRequest,
  userAlreadyExists,
  loginBodyRequest,
  loginIsValid,
};