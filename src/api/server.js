const app = require('./app');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');

const PORT = 3000;

app.use(bodyParser.json());

app.use('/users', usersController);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
