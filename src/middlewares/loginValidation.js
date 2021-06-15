
const reqBodyValidation = (email, password) => {

  if(!email || !password) return false;
  
  return true;

};


const controlValidation = (email, password) => {

  const isValid = reqBodyValidation(email, password);
  console.log('isNameValid line 20', isValid);
  if(!isValid) return { message: 'All fields must be filled'};

  return isValid;

};

module.exports = {
  controlValidation,
};
