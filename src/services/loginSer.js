// regras dos negócios
const LoginModel = require('../models/loginMod');
const userModel = require('../models/usersMod');


const getAll = async (dataUsers) => {

  const getAll = await LoginModel.getAll();

  console.log('getAll loginSer line 8', getAll);

  const emailExist = getAll.some((data) => 
    // console.log(data.email, dataUsers.email, data.password, dataUsers.password);
    data.email === dataUsers.email
  );
  console.log('emailExist loginSer line 11', emailExist);

  const passwordExist = getAll.some((data) => 
    // console.log(data.password, dataUsers.password);
    data.password === dataUsers.password
  );
  console.log('emailExist loginSer line 16', passwordExist);

  if(!emailExist || !passwordExist) return { message: 'Incorrect username or password'};

  const findUser = await getAll.find((data) => data.email === dataUsers.email);
  console.log('findUser', findUser);


  // console.log('dataUsers', dataUsers);
  // let objDataUsers;
  
  
  // if(dataUsers.role) {
  //   objDataUsers = dataUsers;
  // } else {
  //   objDataUsers = {
  //     name: dataUsers.name,
  //     email: dataUsers.email,
  //     password: dataUsers.password,
  //     role: 'user',
  //   };
  // };
  // console.log('objDataLogin', objDataUsers);

  // const { name, email, password, role } = objDataUsers;
  
  // const insertUserDb = await LoginModel
  //   .addUsers(name, email, password, role);
  // console.log('addUsers usersSer line 7', insertUserDb);

  // return {
  //   name,
  //   email,
  //   role,
  //   _id: insertUserDb._id,
  // };

  return findUser;


};

module.exports = {
  getAll,
};
