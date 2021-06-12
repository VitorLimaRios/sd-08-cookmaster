const { usersServices } = require('../services');
const {
  createUser,
} = usersServices;

const SUCESS = 200;
const CREATED = 201;
const UNPROCESSABLE = 422;
const BAD = 400;
const CONFLICT = 409;

const usersCreate = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await createUser(name, email, password, role);

    if (result.message === 'Email already registered') {
      return res.status(CONFLICT).json(result);
    }
    if (result.message === 'Invalid entries. Try again.') {
      return res.status(BAD).json(result);
    }

    return res.status(CREATED).json(result);
  } catch (error) {
    console.error(error);
    return res.status(BAD).json(error);
  }
};

module.exports = {
  usersCreate,
};
