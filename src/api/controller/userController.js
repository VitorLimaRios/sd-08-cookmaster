const service = require('../service/userService');


const OK = 201;
const OK_LOGIN = 200;
const notUnique = 409;
const notValidEmail = 400;
const notValidLogin = 401;


const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body);
    const newUser = await service.create(name, email, password);
    return res.status(OK).json(
      {user: { name: newUser.name, email: newUser.email, role: newUser.role} }
    );
  } catch (e) {
    if (e.message === 'Email already registered') {
      return res.status(notUnique).json({
        message: e.message,
      });
    }
    return res.status(notValidEmail).json({
      message: e.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await service.login(email, password);
    // console.log(userLogin);
    return res.status(OK_LOGIN).json({token:userLogin});
  } catch (e) {
    return res.status(notValidLogin).json({
      message: e.message,
    });
  }
};

module.exports = {
  createUser,
  login,
};
