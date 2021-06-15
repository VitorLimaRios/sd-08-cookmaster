const ServicesUsers = require('../services/servicesUsers');
const CODE = require('../error/code');

class ControllerUsers {
  async create(req, res, next) {
    const servicesUsers = new ServicesUsers();
    try {
      const user = req.body;
      const result = await servicesUsers.serviceCreateUser(user, false);
      if (result.err || !result.user) return next(result);
      return res.status(CODE.created).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerUsers;
