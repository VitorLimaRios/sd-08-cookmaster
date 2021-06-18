const {
  adduser,
} = require('../models/usersModel');

const errcreate = {message:'Invalid entries. Try again.'};
const reg = /.+@[A-z]+[.]com/;


const createUser = async(body) =>{
  if(!body.name || !body.email || !body.password || !reg.test(body.email)){
    return errcreate;
  }
  const result = await adduser(body);
  return result;
};





module.exports = {
  createUser,

};
