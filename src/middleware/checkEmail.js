const re = /.+@[A-z]+[.]com/;
const checkEmail = (email) => {
  if(!re.test(email)) {
    throw new Error ('Invalid entries. Try again.');
  }
};

const checkLoginEmail = (email) => {
  if(!email){
    throw new Error('All fields must be filled');
  }
  if(!re.test(email)){
    throw new Error('Incorrect username or password');
  }
};

module.exports = {
  checkEmail, checkLoginEmail
};