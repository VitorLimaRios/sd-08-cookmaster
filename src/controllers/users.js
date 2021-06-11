const userServices = require('../services/users');

const { code, message } = require('../helper/status');

const readUsers = async(req, res) => {
  userServices.readUsers()
    .then(response => res.status(code.OK).json(response))
    .catch(console.log);
};

module.exports = {
  readUsers,
};