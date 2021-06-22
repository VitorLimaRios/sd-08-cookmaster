const connection = require('./connection');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../utils/secret');

const Login = async ({email, password}) => {
  const db = await connection();
  const user = await db.collection('users').findOne({
    email,
    password,
  });

  if (!user) return '';

  const authToken = jwt.sign(
    { user },
    SECRET_KEY,
    {
      algorithm: 'HS256', expiresIn: '1d',
    }
  );

  return authToken;
};

module.exports = Login;