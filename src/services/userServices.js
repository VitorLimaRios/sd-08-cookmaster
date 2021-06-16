const Users = require('../models/userModel');


const CREATED = 201;
const BAD_REQUEST = 400;
const CONFLICT = 409;

const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



const create = async ({name,email,password})=>{
  if (!name || !email || !password || !validEmail.test(email))
    return { code: BAD_REQUEST, message: { message: 'Invalid entries. Try again.' } };

  const existanteUser = await Users.findEmail(email);

  if (existanteUser)
    return { code: CONFLICT, message: { message: 'Email already registered' } };
    
  const results = await Users.create({name,email,password});
  const user ={
    
    name: results.name,
    email: results.email,
    role: results.role,
    _id: results._id,

  };
  return ({code:CREATED,message:{user}});
};

module.exports = {
  create
};
