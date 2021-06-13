const { ObjectId } = require('mongodb');

const payloadUserInput = { 
  name: 'name',
  email: 'validemail@email.com',
  password: 'password'
};

const payloadUserResult = {
  _id: ObjectId(),
  name: 'name',
  email: 'validemail@email.com',
  role: 'user'
};

const invalidEntriesError = {
  err: {
    code: 'invalid_data',
    message: 'Invalid entries. Try again.'
  }
};

const invalidEmailError = {
  err: {
    code: 'conflict',
    message: 'Email already registered'
  }
};

const invalidEntryErrorMessage = {
  message: 'Invalid entries. Try again.'
};

const invalidEmailErrorMessage = {
  message: 'Email already registered'
};

module.exports = {
  payloadUserResult,
  payloadUserInput,
  invalidEntriesError,
  invalidEmailError,
  invalidEntryErrorMessage,
  invalidEmailErrorMessage
};
