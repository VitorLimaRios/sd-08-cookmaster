const jwt = require('jsonwebtoken');

const generateToken = async (user) => {
  const { error } = validLogin.validate(user);
  if (error) return { status: 401, message: error.details[0].message };
  const findEmail = await validEmail(user.email);
  if (findEmail === null) {
    return { status: 401, message: 'Incorrect username or password' };
  };
  const findPassword = await validPassword(user.password);
  let bool = true;
  if (!findEmail || !findPassword) bool = false;
  const payload = {
    email: user.email,
    role: bool,
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};