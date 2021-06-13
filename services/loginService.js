const model = require('../models/loginModel');
const modelUser = require('../models/userModel');

const getAll = async () => model.getAll();

const create = async (users) => {
  const user = await modelUser.getAll();
  const userFind = user.find(element => element.email === users.email);
  const passwordFind = user.find(element => element.password === users.password);
  const { email, password } = users; 
  if (!email || !password) {
    return {      
      message: 'All fields must be filled'      
    };
  } 
  if (!userFind || !passwordFind) {
    return {      
      message: 'Incorrect username or password'       
    };
  }   
  return model.create(users);
};
  
  
  
module.exports = {
  getAll,
  create,
};