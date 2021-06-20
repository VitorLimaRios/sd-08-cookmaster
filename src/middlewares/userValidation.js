const validBody = (name, email, password) => {
  const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailValid = reg.test(email);

  if (!name || !email || !emailValid || !password) return false;

  return true;

};

const controlValidation = (name, email, password) => {

  const bodyValid = validBody(name, email, password);
  if(!bodyValid) return { message: 'Invalid entries. Try again.'};

  return {
    users: {
      name,
      email,
      password,
    }
  };

};

module.exports = {
  controlValidation,
};