const { ObjectId } = require('mongodb');
const conn = require('./conn');



const addrecipie = async(body, _id)=>{
  const formated = {...body, 'userId':_id};
    
  const result = await  conn().then(async (db) => 
    db.collection('recipies').insertOne(formated)
  );
  return {'recipe':result.ops[0]};
};






module.exports = {
  addrecipie
};
