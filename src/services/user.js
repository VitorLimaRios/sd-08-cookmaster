const user = require('../models/user');

const OK = 200;
const CREATED = 201;

const get = async (_req, res) => {
  res.status(OK).json(
    {
      users: await user.getAll()
    }
  );
};

const post = async (req, res) => {
  const { name, email, password } = req.body;
  let { role } = req.body;
  if (!role || role != 'admin') role = 'user';
  const userObject = await user.create(name, email, password, role);
  delete userObject.ops[0]['password'];
  res.status(CREATED).json(
    {
      'user': userObject.ops[0]
    }
  );
};

module.exports = {
  get,
  post,
};
