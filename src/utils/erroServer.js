const errorServer = {
  internalServerError: (message = 'An internal server error occurred') => {
    return {
      statusCode: 500,
      error: 'Internal Server Error',
      message,
    };
  }
};

module.exports = errorServer;
