const user = require('../Models/userModel');


const isValidThings = (name, email, password, role) => {
  if(!name) { 
    return 'Invalid entries. Try again.'; 
  };

  //regex tirada do: https://formik.org/docs/guides/validation
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if(!email) {
    return 'Invalid entries. Try again.';
  }

  if(!regexEmail.test(email)){
    return 'Invalid entries. Try again.';
  }

  if(!password) {
    return 'Invalid entries. Try again.';
  }
  return undefined;
};

const create = async (name, email, password) => {
  const findUser = await user.findEmail(email);
  if (findUser) {
    throw new Error('Email already registered');
  }
  const notValid = isValidThings(name, email, password);
  if (notValid) {
    throw new Error(notValid);
  }
  return await user.create(name, email, password);
};

module.exports = {
  create,
};
