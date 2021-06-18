const { HTTP_201_STATUS } = require('../shared/httpTypes');
const useModels = require('../models/user.models');

const add = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await useModels.createNewUserOnDatabase(
    name,
    email,
    password
  );

  return res.status(HTTP_201_STATUS).json({
    user: newUser,
  });
};

module.exports = {
  add,
};
