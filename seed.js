const connection = require('./src/api/models/connection');

// colocar query do MongoDB

const addAdmin = async() => {
  const db = await connection();
  const inserted = await db.collection('users').insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
  // db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
};

module.exports = {
  addAdmin
}