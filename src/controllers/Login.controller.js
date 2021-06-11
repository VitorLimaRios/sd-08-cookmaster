const { create } = require('../services/Login.services');

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNATHOURIZED_STATUS = 401;

module.exports = {
  create: async (request, response) => {
    const { email, password } = request.body;

    try {
      if (!email || !password) {
        return response
          .status(HTTP_UNATHOURIZED_STATUS)
          .send({ message: 'All fields must be filled' });
      }

      const user = await create(email, password);

      if (!user) {
        return response
          .status(HTTP_UNATHOURIZED_STATUS)
          .send({ message: 'Incorrect username or password' });
      }

      return response.status(HTTP_OK_STATUS).send({ token: user });
    } catch (err) {
      console.log(err);
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  }
};