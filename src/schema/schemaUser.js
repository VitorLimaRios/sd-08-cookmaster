const ValidUser = require('./validation');

const schema = (user) => {
  const { name, password, email } = user;
  const isValid = new ValidUser();

  let result = isValid.setValue(name).required().min().string().message; 
  if (result !== 'pass') {
    return result;
  }

  result = isValid.setValue(password)
    .required().min().string().message;
  if (result !== 'pass') {
    return result;
  }

  result = isValid.setValue(email)
    .required().string().validEmail().message;
  if (result !== 'pass'){
    return result;
  }
  return result;
};

module.exports = schema;