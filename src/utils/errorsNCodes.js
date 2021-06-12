const responses = {
  OK: {
    status: 200
  },
  CREATED: {
    status: 201
  },
  BAD_REQUEST: {
    status: 400,
    message: 'Invalid entries. Try again'
  },
  CONFLICT: {
    status: 409,
    message: 'Email already registered'
  }
};

const { BAD_REQUEST, CONFLICT } = responses;

const errors = {
  Users: {
    mustHaveName: BAD_REQUEST,
    mustHaveEmail: BAD_REQUEST,
    mustHavePassword: BAD_REQUEST,
    emailMustBeUnique: CONFLICT,
  }
};

console.log(errors.Users.mustHaveEmail)

module.exports = { errors, responses };
