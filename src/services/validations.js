const isEmailvalid = (value) => {
  const emailRegex = /.+@[A-z]+[.]com/;
  return isValidEmail = emailRegex.test(value);
};

const emailAlreadyExists = async (email) => {
  const users = await UsersModel.getAll();
  return users.some((user) => user.email === email);
};

module.exports = {
  isEmailvalid,
  emailAlreadyExists,
};
