const model = require('../models/usersModels');
const { validateEmail } = require('../middlewares/userMiddleware');


async function createUser(user) {
  const  { name, email, password } = user;

  console.log(user);
  if (!name || !email || !password){
    return {code: 400, message :{message: 'Invalid entries. Try again.'}};
  };

  if(!validateEmail(email)) {
    return {code: 400, message :{message: 'Invalid entries. Try again.'}};
  };

  const IsEmail = await model.findByEmail(email);
  if(IsEmail) {
    return {code: 409, message :{message: 'Email already registered'}};
  }

  user = {...user, role: 'user'};

  const result = await model.createUser(user);
  result.password = undefined;
  return {code: 201, message : {user:result }};
};

module.exports = { createUser };
