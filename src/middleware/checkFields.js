const checkFields = (name, password, email) => {
  if (!name || !email || !password){
    throw new Error ('Invalid entries. Try again.');
  }
};

const checkLoginFields = (email, password) => {
  if (!email || !password){
    throw new Error ('All fields must be filled');
  }
};

module.exports = {
  checkFields, checkLoginFields
};