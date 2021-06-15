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
      message: 'Invalid entries. Try again.'
    }
  },
  CONFLICT: {
    status: 409,
    send: {
      message: 'Email already registered'
    }
  },
  UNAUTHORIZED: {
    status: 401,
    sendMissing: {
      message: 'All fields must be filled'
    },
    sendInvalid: {
      message: 'Incorrect username or password'
    },
    sendProblematicToken: {
      message: 'jwt malformed'
    }
  },
  NOT_FOUND: {
    status: 404,
    send: {
      message: 'recipe not found'
    }
  },
};

const { BAD_REQUEST, CONFLICT, UNAUTHORIZED, NOT_FOUND } = responsesNCodes;

const errors = {
  Users: {
    mustHaveName: BAD_REQUEST,
    mustHaveEmail: BAD_REQUEST,
    mustHavePassword: BAD_REQUEST,
    emailMustBeValid: BAD_REQUEST,
    emailMustBeUnique: CONFLICT,
    emailOrPasswordIsMissing: UNAUTHORIZED,
    emailOrPasswordIsInvalid: UNAUTHORIZED,
  },
  Recipes: {
    notFound: NOT_FOUND,
    invalidToken: UNAUTHORIZED
  }
};

module.exports = { errors, responsesNCodes };
