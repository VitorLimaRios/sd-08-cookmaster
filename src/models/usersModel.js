const { ObjectId } = require('mongodb');
const conn = require('./conn');


const adduser = async(body)=>{
  return conn().then(
    async (db) => 
    {
      const result = await db.collection('users').insertOne( {...body, role:'user'});
      const {name, email, role,_id} = result.ops[0];
      const envolucro = {user: {name, email,role,_id}};
      return (envolucro);
    }

  );

};





module.exports ={
  adduser,
};