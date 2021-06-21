const loginModel = require('../models/loginModel');

const getAll = async (dataUsers) => {
  const getAll = await loginModel.getAll();
  const emailExist = getAll.some((data) => 
    data.email === dataUsers.email
  );

  const passwordExist = getAll.some((data) => 
    data.password === dataUsers.password
  );

  if(!emailExist || !passwordExist) return { message: 'Incorrect username or password'};

  const findUser = await getAll.find((data) => data.email === dataUsers.email);

  return findUser;
};

module.exports = {
  getAll,
};
