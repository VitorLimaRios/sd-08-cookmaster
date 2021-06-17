const connection = require('./connection');
const { ObjectId } = require('mongodb');

const registerUsers = async ({name, email, password, role}) => {
    try {
      const response = await connection().then((db) => db.collection('users')
        .insert({name, email, password, role}));    
      return response.ops[0];
    } catch (error) {
        console.log(error);
    }
};

const findEmail = async (email) =>{
  try {
    
    const response = await connection().then((db) => db.collection('users')
      .find({email: email}).toArray());
    return response;

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    registerUsers,
    findEmail,
}
