const rescue = require('express-rescue');
const ServicesUsers = require('../services/servicesUsers');

class ControllerUsers{
  async create(req, res, next) {
    const servicesUsers = new ServicesUsers();
    try{
      const user = req.body;
      const result = await servicesUsers.serviceCreateUser(user, false);
      if (result.message) return next(result);
      return result;
    }catch(err) {
      next(err);
    }  
  };
}

module.exports = ControllerUsers;
