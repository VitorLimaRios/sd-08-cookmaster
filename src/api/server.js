const app = require('./app');
const { port } = require('./.env').api;

app.listen(port, () => console.log(`App running on PORT: ${port}`));
