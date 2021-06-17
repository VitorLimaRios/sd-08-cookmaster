const service = require('../services/login');

const OK = 200;
const BAD = 400;

const loginController = async (req, res) => {
  try {
    const token = await service(req, res);

    return res.status(OK).json({ token });
  } catch (error) {
    return res.status(BAD).json(error);
  }
};
module.exports = loginController;