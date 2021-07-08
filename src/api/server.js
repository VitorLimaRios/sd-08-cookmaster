const app = require('./app');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');

const PORT = 3000;

app.use(bodyParser.json());

app.use('/users', usersController);
app.use('/login', loginController);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
