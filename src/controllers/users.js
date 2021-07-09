const Users = require('../services/users');

const CREATED = 201;


const create = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const newUser = await Users.create({name, email, password, role});

  if ( await newUser.error) return next(newUser);

  res.status(CREATED).json(newUser);
};

module.exports = {
  create,
};
