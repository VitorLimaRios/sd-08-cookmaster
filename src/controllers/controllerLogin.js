const CODE = require('../error/code');
const CustomError = require('../error/customError');
const ServicesLogin = require('../services/servicesLogin');

class ControllerLogin {
  async login (req, res, next) {
    try {
      const servicesLogin = new ServicesLogin();
      const dataUser = req.body;
      const resultLogin = await servicesLogin.login(dataUser);
      if (!resultLogin.token) return next(resultLogin);
      return res.status(CODE.ok).json(resultLogin);
    } catch(err) {
      return next(err);
    }
  }
}

module.exports = ControllerLogin;
