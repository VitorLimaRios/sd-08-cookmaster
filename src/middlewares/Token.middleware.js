require('dotenv').config();

const jwt = require('jsonwebtoken');

const HTTP_UNAUTHORIZED_STATUS = 401;

module.exports = (request, response, next) => {
  const { Authorization } = request.headers;

  if (!Authorization) {
    return response
      .status(HTTP_UNAUTHORIZED_STATUS)
      .send({ message: 'missing auth token' });
  }

  jwt.verify(Authorization, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return response
        .status(HTTP_UNAUTHORIZED_STATUS)
        .send({ message: 'jwt malformed' });
    }

    request.user = user;

    next();
  });
};