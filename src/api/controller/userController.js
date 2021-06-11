const service = require('../service/userService');


const OK = 201;
const notUnique = 409;
const notValidEmail = 400;


const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name);
    const newUser = await service.create(name, email, password);
    return res.status(OK).json(newUser);
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

module.exports = {
  createUser
};
