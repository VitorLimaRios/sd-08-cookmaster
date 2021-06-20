const { ObjectId } = require('mongodb');
const conn = require('./conn');


const adduser = async(body)=>{
  const result = await  conn().then(async (db) =>   
    db.collection('users').insertOne( body));
  return (result.ops[0]);
};

const getbyemail = async(email)=>{
  const emailcheck = await conn().then(
    async (db) => db.collection('users').findOne({email})
  );
  console.log('usermodel13', emailcheck);
  return (emailcheck);
};



module.exports ={
  adduser,
  getbyemail,
};