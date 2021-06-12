const responsesNCodes = {
  OK: {
    status: 200
  },
  CREATED: {
    status: 201
  },
  BAD_REQUEST: {
    status: 400,
    send: {
      message: 'Invalid entries. Try again'
    }
  },
  CONFLICT: {
    status: 409,
    send: {
      message: 'Email already registered'
    }
  }
};

const { BAD_REQUEST, CONFLICT } = responsesNCodes;

const errors = {
  Users: {
    mustHaveName: BAD_REQUEST,
    mustHaveEmail: BAD_REQUEST,
    mustHavePassword: BAD_REQUEST,
    emailMustBeUnique: CONFLICT,
  }
};

module.exports = { errors, responsesNCodes };
