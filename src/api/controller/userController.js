const service = require('../service/userService');

const CODE_201 = 201;
const CODE_200 = 200;
const CODE_409 = 409;
const CODE_400 = 400;
const CODE_401 = 401;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await service.create(name, email, password);
    return res.status(CODE_201).json(
      {user: { name: newUser.name, email: newUser.email, role: newUser.role} }
    );
  } catch (e) {
    if (e.message === 'Email already registered') {
      return res.status(CODE_409).json({
        message: e.message,
      });
    }
    return res.status(CODE_400).json({
      message: e.message,
    });
  }
};

const login = async (req, res) => {
  try {

    const { email, password } = req.body;
    const userLogin = await service.login(email, password);
    return res.status(CODE_200).json({token:userLogin});

  } catch (e) {

    return res.status(CODE_401).json({
      message: e.message,
    });

  }
};

module.exports = {
  createUser,
  login,
};
