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

module.exports = {
  userBodyRequest,
  userAlreadyExists,
};