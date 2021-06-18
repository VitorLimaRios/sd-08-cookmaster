const connection = require('./src/api/models/connection');

// colocar query do MongoDB

const addAdmin = async() => {
  console.log("addAmin")
  const db = await connection();
  const inserted = await db.collection('users').insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
  console.log(inserted.ops[0]);
  // db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
};

module.exports = {
  addAdmin
}