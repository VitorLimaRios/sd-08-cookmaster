const jwt = require('jsonwebtoken');

const HTTP_FORBIDDEN_STATUS = 403;

module.exports = (request, response, next) => {
  const { authorization } = request.headers;

  jwt.verify(authorization, process.env.JWT_SECRET, (_err, user) => {
    if (user.role !== 'admin') {
      console.log(user);
      return response
        .status(HTTP_FORBIDDEN_STATUS)
        .send({ message: 'Only admins can register new admins' });
    }

    request.user = user;

    next();
  });
};