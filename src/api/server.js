const app = require('./app');
const userMiddleWare = require('../controller/middlewareUser');
const loginMiddleWare = require('../controller/middlewareLogin');
const recipeMiddleWare = require('../controller/middlewareRecipes');
const validateJwt = require('../service/authenticToken');
const PORT = 3000;

app.use('/users', userMiddleWare);
app.use('/login', loginMiddleWare);
app.use('/recipes', validateJwt, recipeMiddleWare);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
