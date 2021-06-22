const app = require('./app');
const userMiddleWare = require('../controller/middlewareUser');
const loginMiddleWare = require('../controller/middlewareLogin');
const recipeMiddleWare = require('../controller/middlewareRecipes');

const PORT = 3000;

app.use('/users', userMiddleWare);
app.use('/login', loginMiddleWare);
app.use('/recipes', recipeMiddleWare);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
