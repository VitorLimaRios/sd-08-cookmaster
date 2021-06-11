const service = require('../service/userService');


const OK = 201;
const notUnique = 409;
const notValidEmail = 400;


const createUser = async(req, res) => {
  const { name, email, password} = req.body;
  try {
    const newUser = await service.create(name, email, password);

    res.status(OK).json(newUser);
  } catch (e) {
    if(e === 'Email already registered') {
      res.status(notUnique).json({e: {
        message: e.message
      }});
    }
    res.status(notValidEmail).json({e: {
      message: e.message
    }});
  }
};

module.exports = {
  createUser
};
