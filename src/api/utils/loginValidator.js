const UNAUTHORIZED = 401;
const OK = 200;

const emailValidate = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const loginValidator = async (loginData) => {
  if (!loginData || !loginData.email || !loginData.password) {
    return {
      error: {
        code: UNAUTHORIZED,
        message: 'All fields must be filled'
      }
    };
  }

  if (!emailValidate(loginData.email)) return {
    error: {
      code: UNAUTHORIZED,
      message: 'Incorrect username or password'
    }
  };
  return {
    code: OK
  };
};

module.exports = loginValidator;