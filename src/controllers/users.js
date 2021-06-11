const userServices = require('../services/users');

const { code, message } = require('../helper/status');
const { response } = require('express');

const readUsers = async(_req, res) => {
  userServices.readUsers()
    .then(response => res.status(code.OK).json(response))
    .catch(console.log);
};

const createUsers = async(req, res) => {
  const newUser = req.body;

  userServices.createUser(newUser)
    .then(response => res.status(code.CREATED).json({ user: response }))
    .catch(err => {
      console.log(err);
      const { status, message } = JSON.parse(err.message);
      
      res.status(status).json({ message });
    });
};

module.exports = {
  readUsers,
  createUsers,
};