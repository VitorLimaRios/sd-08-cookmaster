const { create } = require('../services/Users.services');
const REG_EX = require('../helpers/RegEx.helper');

const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_CONFLICT_STATUS = 409;

module.exports = {
  create: async (request, response) => {
    const { name, email, password } = request.body;

    try {
      if (!name || !email || !REG_EX(email) || !password) {
        return response
          .status(HTTP_BAD_REQUEST_STATUS)
          .send({ message: 'Invalid entries. Try again.' });
      }

      const user = await create(name, email, password);

      if (!user) {
        return response
          .status(HTTP_CONFLICT_STATUS)
          .send({ message: 'Email already registered' });
      }

      return response.status(HTTP_CREATED_STATUS).send({ user });
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  }
};