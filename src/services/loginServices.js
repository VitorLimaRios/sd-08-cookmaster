const loginModel = require('../models/loginModel');

const getAll = async (dataUser) => {
  const getAll = await loginModel.getAll();
  const emailExist = getAll.some((data) => 
    data.email === dataUser.email
  );

  const passwordExist = getAll.some((data) => 
    data.password === dataUser.password
  );

  if(!emailExist || !passwordExist) return { message: 'Incorrect username or password'};

  return getAll;
};

module.exports = {
  getAll,
};