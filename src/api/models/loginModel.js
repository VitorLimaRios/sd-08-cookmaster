// // const {ObjectId} = require('mongodb');
// const connect = require('./connection');

// const findEmail = async(email) =>
//   connect().then(async(db) => {
//     const result = await db.collection('users').findOne({email});
//     // console.log(result);
//     return result;
//   });

// module.exports = {findEmail};