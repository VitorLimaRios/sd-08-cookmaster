
const reqBodyValidation = (email, password) => {
  // const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  // const isEmailValid = validEmail.test(email);
  // console.log('validEmail line 4', isEmailValid);

  if(!email || !password) return false;
  
  return true;

};


const controlValidation = (email, password) => {

  const isValid = reqBodyValidation(email, password);
  console.log('isNameValid line 20', isValid);
  if(!isValid) return { message: 'All fields must be filled'};

  return isValid;

};



// const postUsers = (req, res, next) => {
//   const { name } = req.body;

//   const isNameValid = nameValidation(name);

//   if(!isNameValid) return { message: 'Invalid entries. Try again'};

// };

module.exports = {
  controlValidation,
};
