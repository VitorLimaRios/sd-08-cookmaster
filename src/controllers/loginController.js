const loginServices = require('../services/loginServices');
const { code } = require('../helpers/messages');

const loginController = async (req, res) => {
  try {
    const token = await loginServices(req, res);

    return res.status(code.OK).json({ token });
  } catch (error) {
    return res.status(code.BAD_REQUEST).json(error);
  }
};
module.exports = loginController;
