const errorClient = {
  badRequest: (message) => {
    return {
      statusCode: 400,
      error: 'Bad Request',
      message,
    };
  },
  conflict: (message) => {
    return {
      statusCode: 409,
      error: 'Conflict',
      message,
    };
  },
  unauthorized: (message) => {
    return {
      statusCode: 401,
      error: 'Unauthorized',
      message,
    };
  },
};

module.exports = errorClient;
