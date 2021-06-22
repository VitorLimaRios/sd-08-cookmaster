const mongoConnection = require("./src/models/mongoConnection");

const connect = mongoConnection();

connect().then((db) => {
 return db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
});
