const app = require('./app');
const userMiddleWare = require('../controller/middlewareUser');

const PORT = 3000;

app.use('/users', userMiddleWare);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
