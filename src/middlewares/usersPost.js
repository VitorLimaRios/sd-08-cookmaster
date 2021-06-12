
const reqBodyValidation = (name, email, password) => {
  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isEmailValid = validEmail.test(email);
  console.log('validEmail line 4', isEmailValid);

  if(!name || !email || !isEmailValid || !password) return false;
  
  return true;

};

// const emailValidation = (email) => {
//   if(!email) return false;
//   return true;

// };

const controlValidation = (name, email, password) => {

  const isValid = reqBodyValidation(name, email, password);
  console.log('isNameValid line 20', isValid);
  if(!isValid) return { message: 'Invalid entries. Try again.'};

  return {
    users: {
      name,
      email,
      password,
    }
  };

};



// const postUsers = (req, res, next) => {
//   const { name } = req.body;

//   const isNameValid = nameValidation(name);

//   if(!isNameValid) return { message: 'Invalid entries. Try again'};

// };

module.exports = {
  controlValidation,
};
