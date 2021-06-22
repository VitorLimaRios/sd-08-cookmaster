const createNewUser = require('../services/CreateNewUser');

const CREATED = 201;

const CreateNewUserMiddleware = async (req, res, next) => {
  const {name, email, password} = req.body;
  const user = await createNewUser({
    name,
    email,
    password,
    role: 'user',
  });

  delete user.password;

  return res.status(CREATED).json({user});
};

module.exports = CreateNewUserMiddleware;