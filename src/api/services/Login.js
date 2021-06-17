const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { General } = require('../models');
const {
  resources: { Login },
  api: { jwt: { privateKey, jwtOptions } }
} = require('../.env');

const login = async (obj) => {
  const [user] = await General.findWith(Login.tableOrCollec, { email: obj.email });
  if (!user) return { error: {
    code: 'unauthenticated', message: 'Incorrect username or password' } };

  // const isAuthentic = await bcrypt
  //   .compare(obj.password, user.password).then((res) => res);
  const isAuthentic = obj.password === user.password;
  if (!isAuthentic) return { error: {
    code: 'unauthenticated', message: 'Incorrect username or password' } };
  
  const { password: _pwd, ...userWithoutPwd } = user;
  const token = jwt.sign({ data: userWithoutPwd }, privateKey, jwtOptions);
  return { result: { token } };
};

module.exports = {
  login,
};
