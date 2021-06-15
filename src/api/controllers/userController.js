const service = require('../service/userService');

const OK = 200;
const Created = 201;
const notValid = 400;
const invalid = 401; 
const notUnique = 409;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await service.create(name, email, password);
    return res.status(Created).json(
      {user: { name: newUser.name, email: newUser.email, role: newUser.role} }
    );
  } catch (err) {
    if (err.message === 'Email already registered') {
      return res.status(notUnique).json({
        message: err.message,
      });
    }
    return res.status(notValid).json({
      message: err.message,
    });
  }
};

const doLogin = async(req, res) => {
  try {
    const { email, password } = req.body;
    const login = await service.login(email, password);
    return res.status(OK).json({token: login});
  } catch (err) {
    return res.status(invalid).json({
      message: err.message,
    });
  }
};

module.exports = {
  createUser,
  doLogin,
};