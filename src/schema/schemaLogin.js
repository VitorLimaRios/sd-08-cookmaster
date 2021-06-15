const ValidUser = require('./validation');

const schema = (dataLogin) => {
  const { email, password } = dataLogin;
  const isValid = new ValidUser();

  let result = isValid.setValue(email)
    .required().string().validEmail().message;
  if (result !== 'pass') {
    return result;
  }

  result = isValid.setValue(password)
    .required().string().message;
  if (result !== 'pass') {
    return result;
  }

  return result;
};

module.exports = schema;
