const { ObjectId } = require('mongodb');
const conn = require('../connection');

const DB = 'users';

const create = async({name,password,email})=>{
  const user = await conn()
    .then(db=>db.collection('users').insertOne({ name, email, password, role: 'user' }));

  return user.ops[0];
};

const findEmail = async(emails) =>{
  const email = await conn().then(db=>db.collection(DB).findOne({email:emails}));
  if(email) return true;
}; 

const findUser = async (data) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email: data });
  return result;
};

module.exports = {
  create,findEmail,findUser
};
