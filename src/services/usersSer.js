// regras dos negócios
const UsersModel = require('../models/usersMod');

const addUsers = async (dataUsers) => {

  const getAll = await UsersModel.getAll();

  console.log('getAll usersSer line 8', getAll);

  const emailExist = getAll.some((data) => 
    // console.log(data.email, dataUsers.email);
    data.email === dataUsers.email
  );
  console.log('emailExist userSer line 11', emailExist);

  if(emailExist) return { message: 'Email already registered'};

  // console.log('dataUsers', dataUsers);
  let objDataUsers;
  
  
  if(dataUsers.role) {
    objDataUsers = dataUsers;
  } else {
    objDataUsers = {
      name: dataUsers.name,
      email: dataUsers.email,
      password: dataUsers.password,
      role: 'user',
    };
  };
  console.log('objDataUsers', objDataUsers);

  const { name, email, password, role } = objDataUsers;
  
  const insertUserDb = await UsersModel
    .addUsers(name, email, password, role);
  console.log('addUsers usersSer line 7', insertUserDb);

  return {
    name,
    email,
    role,
    _id: insertUserDb._id,
  };


};

module.exports = {
  addUsers,
};
