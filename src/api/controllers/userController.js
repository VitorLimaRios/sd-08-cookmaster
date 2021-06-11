const service = require('../service/userService');
const fail = 400;
const fail2 = 409;
const success = 201;
const success2 = 200;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const addUser = await service.createUser(name, email, password);
    console.log(addUser, 'addUser controller');
    res.status(success).json(
      { user: { name: addUser.name, email: addUser.email, role: addUser.role } }
    );
  } catch (err) {
    if (err.message === 'Email already registered') {
      // console.log('catch email unico:', err.message);
      return res.status(fail2).json({
        message: err.message,
      });
    }
    return res.status(fail).json({
      message: err.message,
    });
  }
};

module.exports = {
  createUser,
};
