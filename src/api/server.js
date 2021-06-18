require('dotenv').config();
const app = require('./app');
// comando de limpar porta:  kill -9 $(lsof -t -i:3000)
const DEFAULT_PORT = 3000;

const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
