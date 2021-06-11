const jwt = require('jsonwebtoken');

const HTTP_UNAUTHORIZED_STATUS = 401;

module.exports = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(HTTP_UNAUTHORIZED_STATUS)
      .send({ message: 'missing auth token' });
  }

  jwt.verify(authorization, 'teste', (err, user) => {
    if (err) {
      return response
        .status(HTTP_UNAUTHORIZED_STATUS)
        .send({ message: 'jwt malformed' });
    }

    request.user = user;

    next();
  });
};