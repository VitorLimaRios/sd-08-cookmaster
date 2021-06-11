const usersService =  require('../service/users');

const STATUS_201 = 201;
const STATUS_422 = 422;

// CREATE USER
const create = async (req, res) => {
  const {name, email, password} = req.body;
  const newUser = await usersService.create(name, email, password);
  if (newUser !== null) {
    return res.status(STATUS_201).json(newUser);
  } else { return res.status(STATUS_422).json({
    err: {
      code: 'invalid_data',
      message: 'User already exists',
    },
  });
  }
};

module.exports = {
  create
};
