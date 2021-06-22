const createUser = require('../models/CreateUser');

const createNewUser = async ({name, email, password, role}) => {
  const newUser = await createUser({
    name,
    email,
    password,
    role
  });

  return newUser;
};

module.exports = createNewUser;