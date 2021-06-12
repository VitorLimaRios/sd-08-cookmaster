const app = require('./app');

const serverPort = 3000;
const PORT = process.env.PORT || serverPort;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
